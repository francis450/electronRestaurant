<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\ChildMenuItemCategoryFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(UnitsOfMeasurementsSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(SupplierTableSeeder::class);
        $this->call(InventoryTableSeeder::class);
        // \App\Models\MenuItemCategory::factory()->count(5)->create();
        $this->call(MenuItemCategoryFactory::class);
        $this->call(MenuItemTableSeeder::class);
        $this->call(IngredientsTableSeeder::class);
        \App\Models\InventoryPurchaseReceipt::factory()->count(20)->create();
        \App\Models\Section::factory()->count(10)->create();
        \App\Models\Table::factory()->count(10)->create();
        \App\Models\Order::factory()->count(10)->create();
        \App\Models\OrderItem::factory()->count(20)->create();
        // \App\Models\Payment::factory()->count(10)->create();
    }
}
