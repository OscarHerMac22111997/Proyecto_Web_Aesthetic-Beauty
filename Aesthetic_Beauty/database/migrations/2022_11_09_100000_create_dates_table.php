<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dates', function (Blueprint $table) {
            $table->id();
            $table->integer('id_service');
            $table->integer('id_client');
            $table->integer('id_shop');
            $table->integer('id_stylist');
            $table->integer('id_style');
            $table->integer('id_color');
            $table->date('date');
            $table->time('hour');
            $table->datetime('fulldate');
            $table->string('opinion')->nullable();
            $table->integer('rating')->nullable();
            $table->decimal('total');
            $table->boolean('payed');
            $table->boolean('ok');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dates');
    }
}
