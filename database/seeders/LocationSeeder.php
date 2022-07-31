<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Location::truncate();

        Location::insert([
            [
                'location_name' => 'London',
            ],
            [
                'location_name' => 'New York',
            ],
            [
                'location_name' => 'Paris',
            ],
            [
                'location_name' => 'Tokyo',
            ],
            [
                'location_name' => 'Sydney',
            ],
            [
                'location_name' => 'Melbourne',
            ],
            [
                'location_name' => 'Beijing',
            ],

            [
                'location_name' => 'Singapore',
            ],
            [
                'location_name' => 'Hong Kong',
            ],
        ]);
    }
}
