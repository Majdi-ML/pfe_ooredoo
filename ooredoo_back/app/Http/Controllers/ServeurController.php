<?php

namespace App\Http\Controllers;

use App\Models\Serveur;
use Illuminate\Http\Request;
use App\Models\Demande;
class ServeurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Charger les relations, y compris 'verTechFirmware'
        $serveurs = Serveur::with([
            'etat', 
            'platforme', 
            'typeserveur',
            'serviceplatfom', 
            'os', 
            'soclestandardomu', 
            'demande', 
            'verTechFirmware'  // Ajout de la relation 'verTechFirmware'
        ])->get();
        
        return response()->json($serveurs);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ref' => 'nullable|string|max:255',
            'etat_id' => 'nullable|integer|exists:etat,id',
            'platforme_id' => 'nullable|integer|exists:platforme,id',
            'hostname' => 'nullable|string|max:255',
            'fqdn' => 'nullable|string|max:255',
            'type_id' => 'nullable|integer|exists:typeserveur,id',
            'serviceplatfom_id' => 'nullable|integer|exists:serviceplatfom,id', // Optional for now, will be overridden
            'modele' => 'nullable|string|max:255',
            'os_id' => 'nullable|integer|exists:os,id',
            'verTechFirmware_id' => 'nullable|integer|exists:ver_tech_firmware,id',
            'cluster' => 'nullable|string|max:255',
            'ipSource' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'socleStandardOmu_id' => 'nullable|integer|exists:soclestandardomu,id',
            'complementsInformations' => 'nullable|string',
            'demande_id' => 'required|integer|exists:demandes,id'
        ]);

        // Fetch the Demande to get its serviceplatfom_id
        $demande = Demande::findOrFail($validated['demande_id']);
        $validated['serviceplatfom_id'] = $demande->serviceplatfom_id;

        // Création du serveur with the derived serviceplatfom_id
        $serveur = Serveur::create($validated);

        return response()->json($serveur, 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Charger les relations, y compris 'verTechFirmware'
        $serveur = Serveur::with([
            'etat', 
            'platforme', 
            'typeserveur',
            'serviceplatfom', 
            'os', 
            'soclestandardomu', 
            'demande', 
            'verTechFirmware'  // Ajout de la relation 'verTechFirmware'
        ])->findOrFail($id);
        
        return response()->json($serveur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $serveur = Serveur::findOrFail($id);

        $validated = $request->validate([
            'ref' => 'nullable|string|max:255',
            'etat_id' => 'nullable|integer|exists:etats,id',
            'platforme_id' => 'nullable|integer|exists:platformes,id',
            'hostname' => 'nullable|string|max:255',
            'fqdn' => 'nullable|string|max:255',
            'type_id' => 'nullable|integer|exists:typeserveurs,id',
            'serviceplatfom_id' => 'nullable|integer|exists:serviceplatfoms,id',
            'modele' => 'nullable|string|max:255',
            'os_id' => 'nullable|integer|exists:o_s,id',
            'verTechFirmware_id' => 'nullable|integer|exists:ver_tech_firmware,id',  // Validation de la clé étrangère
            'cluster' => 'nullable|string|max:255',
            'ipSource' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'socleStandardOmu_id' => 'nullable|integer|exists:soclestandardomus,id',
            'complementsInformations' => 'nullable|string',
            'demande_id' => 'nullable|integer|exists:demandes,id'
        ]);

        // Mise à jour du serveur
        $serveur->update($validated);

        return response()->json($serveur);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $serveur = Serveur::findOrFail($id);
        $serveur->delete();

        return response()->json(['message' => 'Serveur deleted successfully']);
    }
}
