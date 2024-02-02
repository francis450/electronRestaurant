<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // make 10 tables
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'section_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
