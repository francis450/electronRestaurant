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
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_item_id')->constrained('inventory', 'id');
            $table->unsignedBigInteger('menu_item_id')->constrained('menu_items', 'id');
            $table->double('quantity');
            $table -> decimal('cost', 8, 2);
            $table->foreign('inventory_item_id')->references('id')->on('inventory');
            $table->foreign('menu_item_id')->references('id')->on('menu_items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredients');
    }
};
