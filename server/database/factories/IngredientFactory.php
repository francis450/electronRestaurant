<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'inventory_item_id' => fake()->numberBetween(1,2),
            'menu_item_id' => fake()->numberBetween(1,2),
            'quantity' => fake()->randomFloat(2,10,01000),
            'unit_of_measurement_id' => fake()->numberBetween(1,2),
            'cost' => fake()->randomFloat(2,10,01000)
        ];
    }
}
