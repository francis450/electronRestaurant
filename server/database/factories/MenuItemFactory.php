<?php

namespace Database\Factories;

use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->domainName,
            'description' => fake()->text(),
            'price' => fake()->randomFloat(2,0,1000),
            'menu_item_category_id' => fake()->numberBetween(1,2),
            'img' => fake()->url,
            'is_available' => fake()->boolean,
        ];
    }
}
