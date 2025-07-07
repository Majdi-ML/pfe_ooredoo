<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discussions', function (Blueprint $table) {
            $table->id();
            $table->integer('demande_id')->nullable();
            $table->foreign('demande_id')->references('id')->on('demandes')->onDelete('cascade');
            $table->integer('admin_id')->nullable();
            $table->foreign('admin_id')->references('id')->on('user')->onDelete('restrict');
            $table->integer('demandeur_id')->nullable();
            $table->foreign('demandeur_id')->references('id')->on('user')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discussions');
    }
};
