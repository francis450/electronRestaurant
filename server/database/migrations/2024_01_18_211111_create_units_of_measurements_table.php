<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('units_of_measurements', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique(); // Name of the unit
            $table->string('symbol', 10); // Unit symbol
            $table->enum('type', ['base', 'subunit']); // Specifies base or subunit type
            $table->unsignedDecimal('conversion_factor', 8, 4)->nullable(); // Conversion factor, optional for subunits
            $table->unsignedBigInteger('subunit_id')->nullable(); // Reference to the base unit for subunits
            $table->foreign('subunit_id')->references('id')->on('units_of_measurements');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('units_of_measurements');
    }
};
