<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_purchase_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_receipt_id')->constrained('inventory_purchase_receipts', 'id');
            $table->unsignedBigInteger('inventory_item_id')->constrained('inventory', 'id');
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('subtotal', 10, 2); // Calculate subtotal if needed
            $table->decimal('tax', 10, 2)->nullable(); // Calculate tax if needed
            // DB::statement('ALTER TABLE inventory_purchase_items ADD COLUMN subtotal INTEGER DEFAULT (quantity * unit_price)');
            $table->timestamps();

            $table->foreign('purchase_receipt_id')->references('id')->on('inventory_purchase_receipts');
            $table->foreign('inventory_item_id')->references('id')->on('inventory');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_purchase_items');
    }
};
