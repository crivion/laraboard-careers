<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AdminAuthController extends Controller {

    public function showLoginForm() {
        return Inertia::render('Admin/Login');
    }

}