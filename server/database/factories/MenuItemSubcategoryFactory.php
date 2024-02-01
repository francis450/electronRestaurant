<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MenuItemSubcategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected string $model = \App\Models\MenuItemCategory::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // menu item subcategory
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'parent_category_id' => $this->faker->numberBetween(1, 5)
        ];
    }
}
