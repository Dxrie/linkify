<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Click>
 */
class ClickFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'link_id' => rand(1, 20),
            'browser' => 'Firefox',
            'os' => 'Linux',
            'country_name' => 'Indonesia',
            'city_name' => 'Pontianak',
            'created_at' => fake()->dateTimeInInterval('-7 days'),
        ];
    }
}
