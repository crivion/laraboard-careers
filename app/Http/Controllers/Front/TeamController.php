<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Team');
    }
}
