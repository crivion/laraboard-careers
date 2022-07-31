<?php

namespace Database\Seeders;

use App\Models\ContractType;
use Illuminate\Database\Seeder;

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
