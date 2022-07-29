<?php

namespace App\Http\Controllers\Front;

use App\Models\Job;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\ContractType;
use App\Models\Department;
use App\Models\Location;

class HomepageController extends Controller
{
    public function __invoke()
    {

        // get jobs that are not expired
        $jobs = Job::notExpired()
                    ->with('user', 'department', 'location', 'contractType')
                    ->orderByDesc('id')
                    ->simplePaginate(10);

        // all departments, locations, contract types
        $departments = Department::all();
        $locations = Location::all();
        $contractTypes = ContractType::all();

        return Inertia::render('Homepage', compact('jobs', 'contractTypes', 'locations', 'departments'));
    }
}
