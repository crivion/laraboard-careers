<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContractType;

class ContractTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContractType::truncate();

        ContractType::insert([
            [
                'contract_type_name' => 'Full Time',
            ],
            [
                'contract_type_name' => 'Part Time',
            ],
            [
                'contract_type_name' => 'Contract',
            ],
            [
                'contract_type_name' => 'Internship',
            ],
            [
                'contract_type_name' => 'Temporary',
            ],
        ]);
    }
}
