<?php

namespace Database\Factories;

use App\Models\InventoryPurchaseReceipt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryPurchaseReceipt>
 */
class InventoryPurchaseReceiptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'receipt_number' =>  fake()->randomNumber(5),
            'supplier_id' => fake()->numberBetween(1,3),
            'date' => fake()->dateTimeBetween('-1 years', 'now'),
            'total_cost' => fake()->numberBetween(100, 10002),
            'payment_method' => fake()->randomElement(['cash', 'mpesa', 'debit']),
            'notes' => fake()->text
        ];
    }
}
