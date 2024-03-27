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
        Schema::create('confirmados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_invitacion');
            $table->foreign('id_invitacion')->references('id')->on('invitacions')->onDelete('cascade');
            $table->string('nombre_completo');
            $table->string('dato_importante');
            // Agrega otras columnas según sea necesario
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('confirmados');
    }
};
