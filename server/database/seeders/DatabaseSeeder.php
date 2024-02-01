<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        \App\Models\MenuItemCategory::factory()->count(5)->create();
        \App\Models\MenuItemCategory::factory()->count(5)->create();
        $this->call(MenuItemTableSeeder::class);
        $this->call(IngredientsTableSeeder::class);
        // use the factory to seed 20 records
        \App\Models\InventoryPurchaseReceipt::factory()->count(20)->create();
    }
}
