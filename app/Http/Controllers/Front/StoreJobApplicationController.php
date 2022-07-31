<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use Illuminate\Http\Request;

class StoreJobApplicationController extends Controller
{
    public function __invoke(StoreJobApplicationRequest $request)
    {
        dd($request->validated());
    }
   
    
}
