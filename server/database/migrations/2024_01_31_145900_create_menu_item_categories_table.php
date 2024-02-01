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
        Schema::create('menu_item_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->unique();
            $table->unsignedBigInteger('parent_category_id')->nullable();
            $table->foreign('parent_category_id')->references('id')->on('menu_item_categories');
            $table->softDeletes();
            $table->timestamps();   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_item_categories');
    }
};
