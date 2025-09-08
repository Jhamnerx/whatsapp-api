<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMessageHistoriesMessageColumnToText extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('message_histories', function (Blueprint $table) {
            // Cambiar la columna message a TEXT con charset utf8mb4 para soportar emojis
            $table->text('message')->charset('utf8mb4')->collation('utf8mb4_unicode_ci')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('message_histories', function (Blueprint $table) {
            // Revertir el cambio de vuelta a VARCHAR si es necesario
            $table->string('message', 255)->charset('utf8')->collation('utf8_unicode_ci')->change();
        });
    }
}
