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
        $this->call(InventoryTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(MenuItemTableSeeder::class);
        $this->call(IngredientsTableSeeder::class);
    }
}
