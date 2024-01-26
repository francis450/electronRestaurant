<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_id' => fake()->unique()->randomNumber,
            'item_name' => fake()->lastName,
            'category_id' => fake()->numberBetween(1,2),
            'unit_of_measurement_id' => fake()->numberBetween(1,2),
            'current_quantity' => fake()->randomNumber(3),
            'par_level' => fake()->randomNumber(1),
            'reorder_point' => fake()->randomNumber(1),
            'supplier' => fake()->numberBetween(1,2),
            'cost_per_unit' => fake()->randomNumber(1),
            'expiration_date' => fake()->date('Y-m-d'),
            ];
    }
}
