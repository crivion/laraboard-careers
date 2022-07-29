<?php

namespace Database\Factories;

use App\Models\ContractType;
use App\Models\User;
use App\Models\Department;
use App\Models\Location;
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
            'job_title' => fake()->realTextBetween(10, $maxNbChars = 50, $indexSize = 2),
            'job_description' => fake()->realTextBetween(300, 500, $indexSize = 2),
            'key_responsibilities' => fake()->realTextBetween(100, 200, $indexSize = 2),
            'skills_and_experience' => fake()->realTextBetween(150, 300, $indexSize = 2),
            'salary' => '$' . fake()->randomNumber(8) . ' / year',
            'department_id' => Department::inRandomOrder()->first()->id,
            'location_id' => Location::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id,
            'contract_type_id' => ContractType::inRandomOrder()->first()->id,
            'expires_at' => fake()->dateTimeBetween('+3 weeks', '+3 months')
        ];
    }
}
