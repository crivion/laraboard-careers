<?php

namespace Database\Factories;

use App\Models\ContractType;
use App\Models\Department;
use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'job_title' => fake()->text(30),
            'job_description' => fake()->realTextBetween(300, 500, $indexSize = 2),
            'key_responsibilities' => fake()->realTextBetween(100, 200, $indexSize = 2),
            'skills_and_experience' => fake()->realTextBetween(150, 300, $indexSize = 2),
            'salary' => '$'.number_format(fake()->randomNumber(5, true)).' / yr',
            'department_id' => Department::inRandomOrder()->first()->id,
            'location_id' => Location::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id,
            'contract_type_id' => ContractType::inRandomOrder()->first()->id,
            'expires_at' => fake()->dateTimeBetween('+3 weeks', '+3 months'),
        ];
    }
}
