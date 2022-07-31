<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\ContractType;
use App\Models\Department;
use App\Models\Job;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        // pass query string to Inertia to set filtering form state
        $queryFilters = $request->only(['keyword', 'department', 'location', 'contractType']);

        // finally, return the inertia view
        return Inertia::render('Homepage', compact('jobs', 'contractTypes', 'locations', 'departments', 'queryFilters'));
    }
}
