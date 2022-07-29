<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Location;

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
            ]
        ]);
    }
}
