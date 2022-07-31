<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

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
            ],
        ]);
    }
}
