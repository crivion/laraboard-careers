<?php

namespace App\Http\Controllers\Admin;

use App\Models\Job;
use Inertia\Inertia;
use App\Models\Location;
use App\Models\Department;
use App\Models\ContractType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;

class JobsController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // uses JobPolicy to check for permissions
        $this->authorizeResource(Job::class, "job");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $departments = Department::all();
        $locations = Location::all();

        $jobs = Job::postedByMe()
            ->with("department", "location", "contractType", "user")
            ->withCount("applications")
            ->orderByDesc("id")
            ->applyFilters($request)
            ->paginate(10)
            ->withQueryString();

        $queryFilters = $request->only(["keyword", "department", "location"]);

        return Inertia::render(
            "Dashboard/Jobs",
            compact("jobs", "departments", "locations", "queryFilters")
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $departments = Department::all();
        $locations = Location::all();
        $contractTypes = ContractType::all();
        $job = null;

        return Inertia::render(
            "Dashboard/JobFactory",
            compact("job", "departments", "locations", "contractTypes")
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreJobRequest $request)
    {
        // listing
        $listing = $request->validated();
        $listing["salary"] = request("salary");
        $listing["key_responsibilities"] = request("key_responsibilities");
        $listing["skills_and_experience"] = request("skills_and_experience");
        $listing["expires_at"] = request("expires_at");

        // create job
        auth()
            ->user()
            ->jobs()
            ->create($listing);

        // flash success message
        session()->flash("success", "Job listing created successfully.");

        // redirect to jobs index
        return redirect()->route("jobs.index");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        $departments = Department::all();
        $locations = Location::all();
        $contractTypes = ContractType::all();

        return Inertia::render(
            "Dashboard/JobFactory",
            compact("job", "departments", "locations", "contractTypes")
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Job $job, StoreJobRequest $request)
    {
        // listing
        $listing = $request->validated();
        $listing["salary"] = request("salary");
        $listing["key_responsibilities"] = request("key_responsibilities");
        $listing["skills_and_experience"] = request("skills_and_experience");
        $listing["expires_at"] = request("expires_at");

        // update job
        $job->update($listing);

        // flash success message
        session()->flash("success", "Job listing updated successfully.");

        // redirect to jobs index
        return redirect()->route("jobs.index");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        $job->delete();

        session()->flash("success", "Job archived");

        return redirect()->route("jobs.index");
    }
}
