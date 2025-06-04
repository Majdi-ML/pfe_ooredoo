from flask import Flask, request, jsonify
import mysql.connector
import requests
import re

app = Flask(__name__)

# Config MySQL - adapte selon ta config
# Config MySQL
db_config = {
    'host': '127.0.0.1',
    'port': 3307,
    'user': 'root',
    'password': '',
    'database': 'db_ooredoo'
}

def get_existing_tables():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SHOW TABLES")
    tables = [t[0] for t in cursor.fetchall()]
    cursor.close()
    connection.close()
    return tables

def get_table_structure(table_name):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute(f"DESCRIBE `{table_name}`")
    cols = cursor.fetchall()
    cursor.close()
    connection.close()
    return cols

def format_table_structure(table_name, columns):
    formatted_columns = []
    for col in columns:
        line = f"{col['Field']} {col['Type']}"
        if col['Null'] == 'NO':
            line += " NOT NULL"
        if col['Key']:
            line += f" KEY({col['Key']})"
        if col['Default'] is not None:
            line += f" DEFAULT {col['Default']}"
        if col['Extra']:
            line += f" {col['Extra']}"
        formatted_columns.append(line)
    structure = f"Table {table_name}:\n" + "\n".join(formatted_columns)
    return structure

def extract_tables_from_question(question, existing_tables):
    words = re.findall(r'\b\w+\b', question.lower())
    mentioned = [table for table in existing_tables if table.lower() in words]
    return mentioned

def generate_sql(question):
    existing_tables = get_existing_tables()
    mentioned_tables = extract_tables_from_question(question, existing_tables)

    if not mentioned_tables:
        raise Exception("Aucune table mentionnée dans la question n'existe dans la base de données.")

    tables_info = []
    for table in mentioned_tables:
        cols = get_table_structure(table)
        tables_info.append(format_table_structure(table, cols))

    tables_info_str = "\n\n".join(tables_info)

    prompt = f"""
Tu es un assistant qui génère des requêtes SQL pour une base de données MySQL.
Structure des tables (dans la base 'db_ooredoo') :
{tables_info_str}

Génère uniquement une requête SQL (pas de texte), en réponse à la question : "{question}"
"""

    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })

    json_response = response.json()
    if 'response' not in json_response:
        raise Exception(f"Clé 'response' absente dans la réponse de l'API Ollama : {json_response}")

    return json_response['response'].strip()

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "Question manquante"}), 400

    sql = None
    try:
        sql = generate_sql(question)
        print("Requête SQL générée :", sql)

        valid_starts = ('SELECT', 'SHOW', 'DESCRIBE', 'EXPLAIN')
        if not sql.upper().startswith(valid_starts):
            return jsonify({
                "error": "La réponse générée n'est pas une requête SQL valide.",
                "sql": sql
            }), 400

        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute(sql)
        results = cursor.fetchall()
        cursor.close()
        connection.close()

        return jsonify({"sql": sql, "results": results})

    except mysql.connector.Error as err:
        return jsonify({"sql": sql, "error": f"Erreur base de données : {str(err)}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
