<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JobDetailsController extends Controller
{

    public function __invoke(Request $request)
    {
        return Inertia::render('JobDetails', [
            'job' => $request->job,
        ]);
    }
    
}
