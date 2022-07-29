<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
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
