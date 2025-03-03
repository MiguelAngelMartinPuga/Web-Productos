<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerfilPermisoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perfil_permiso', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_perfil');
            $table->unsignedBigInteger('id_permisos');
            $table->foreign('id_perfil')->references('id')->on('perfil')->onDelete('cascade');
            $table->foreign('id_permisos')->references('id')->on('permiso')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('perfil_permiso');
    }
}
