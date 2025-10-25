<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->string('id_pengajuan')->primary();
            $table->string('nama_poktan');
            $table->string('nama_barang');
            $table->string('merek');
            $table->string('tipe');
            $table->string('nama_ketua');
            $table->string('nomor_hp');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};
