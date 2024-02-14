<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => \App\Models\Order::factory(),
            'user_id' => \App\Models\User::factory(),
            'amount' => $this->faker->randomFloat(2, 0, 999999),
            'change' => $this->faker->randomFloat(2, 0, 999999),
            'status' => $this->faker->randomElement(['pending', 'completed', 'canceled']),
            'payment_method' => $this->faker->randomElement(['cash', 'debit', 'mpesa'])
        ];
    }
}
