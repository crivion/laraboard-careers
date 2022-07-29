<?php

namespace App\Http\Controllers\Front;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HomepageController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Homepage');
    }
}
