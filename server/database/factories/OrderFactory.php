<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'table_id' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['pending', 'completed', 'canceled']),
            'total_price' => $this->faker->randomFloat(2, 10, 100),
            'note' => $this->faker->sentence
        ];
    }
}
