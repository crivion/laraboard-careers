<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // create admin user
        User::factory()->create([
            'name' => 'Platform Admin',
            'email' => 'test@example.com',
            'user_type' => 'admin',
        ]);

        // create hr-representatives
        User::factory(5)->create();

        // seed contract types, departments and locations
        $this->call([
            ContractTypeSeeder::class,
            DepartmentSeeder::class,
            LocationSeeder::class,
        ]);

        // seed jobs
        Job::factory(20)->create();
    }
}
