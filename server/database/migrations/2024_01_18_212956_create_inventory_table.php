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
         Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->string('item_id')->unique();
            $table->string('item_name');
            $table->string('category');
            $table->foreignId('unit_of_measurement_id')->constrained('units_of_measurements','id');
            $table->integer('current_quantity')->nullable();
            $table->integer('par_level')->nullable();
            $table->integer('reorder_point')->nullable();
            $table->string('supplier')->nullable();
            $table->decimal('cost_per_unit', 8, 2)->nullable();
            $table->date('expiration_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
