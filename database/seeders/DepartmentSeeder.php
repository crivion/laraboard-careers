<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::truncate();

        Department::insert([
        [
            'department_name' => 'Software Engineering',
        ],
        [
            'department_name' => 'Marketing',
        ],
        [
            'department_name' => 'Accounting',
        ],
        [
            'department_name' => 'Sales',
        ]
    ]);
    }
}
