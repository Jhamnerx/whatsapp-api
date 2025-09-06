<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AddApiKeyToDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('devices', function (Blueprint $table) {
            $table->string('api_key')->unique()->nullable()->after('webhook');
        });

        // Generar api_key para devices existentes
        DB::table('devices')->whereNull('api_key')->get()->each(function ($device) {
            DB::table('devices')
                ->where('id', $device->id)
                ->update(['api_key' => Str::random(32)]);
        });

        // Hacer el campo obligatorio después de llenar datos existentes
        Schema::table('devices', function (Blueprint $table) {
            $table->string('api_key')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('devices', function (Blueprint $table) {
            $table->dropColumn('api_key');
        });
    }
}
