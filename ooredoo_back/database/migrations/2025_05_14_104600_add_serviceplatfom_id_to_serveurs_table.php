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
        Schema::table('serveurs', function (Blueprint $table) {
            $table->integer('serviceplatfom_id')->nullable();
            $table->foreign('serviceplatfom_id')->references('id')->on('serviceplatfom')->onDelete('set null');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('serveurs', function (Blueprint $table) {
            $table->dropForeign(['serviceplatfom_id']);
            $table->dropColumn('serviceplatfom_id');
        });
    }
};
