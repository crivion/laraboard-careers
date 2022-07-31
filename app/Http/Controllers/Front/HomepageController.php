<?php

namespace App\Http\Controllers\Front;

use App\Models\Job;
use Inertia\Inertia;
use App\Models\Location;
use App\Models\Department;
use App\Models\ContractType;
use App\Http\Controllers\Controller;
use Error;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    public function __invoke(Request $request)
    {

        // get jobs that are not expired
        $jobs = Job::notExpired()
                    ->with('user', 'department', 'location', 'contractType')
                    ->orderByDesc('id')
                    ->applyFilters($request)
                    ->simplePaginate(10)
                    ->withQueryString();

        // all departments, locations, contract types
        $departments = Department::all();
        $locations = Location::all();
        $contractTypes = ContractType::all();

        // pass query string to Inertia
        $queryFilters = $request->only(['keyword', 'department', 'location', 'contractType']);

        return Inertia::render('Homepage', compact('jobs', 'contractTypes', 'locations', 'departments', 'queryFilters'));
    }
}
