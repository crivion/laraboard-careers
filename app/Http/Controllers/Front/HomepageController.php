<?php

namespace App\Http\Controllers\Front;

use App\Models\Job;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HomepageController extends Controller
{
    public function __invoke()
    {

        // get jobs that are not expired
        $jobs = Job::notExpired()
                    ->with('user', 'department', 'location', 'contractType')
                    ->orderByDesc('id')
                    ->simplePaginate(10);

        return Inertia::render('Homepage', compact('jobs'));
    }
}
