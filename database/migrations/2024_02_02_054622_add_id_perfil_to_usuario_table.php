<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('usuario', function (Blueprint $table) {
            $table->unsignedBigInteger('id_perfil')->default(2);
        });
    }

    public function down()
    {
        Schema::table('usuario', function (Blueprint $table) {
            $table->dropForeign(['id_perfil']);
            $table->dropColumn('id_perfil');
        });
    }
};
