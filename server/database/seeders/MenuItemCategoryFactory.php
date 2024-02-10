<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuItemCategoryFactory extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\MenuItemCategory::factory()->count(5)->create();
        // run ChildMenuItemCategoryFactory to make 5 child categories for each parent category
        \App\Models\MenuItemCategory::all()->each(function ($parentCategory) {
            \App\Models\MenuItemCategory::factory()->count(5)->create([
                'parent_category_id' => $parentCategory->id
            ]);
        });

    }
}
