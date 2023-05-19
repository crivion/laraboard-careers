<?php

namespace App\Http\Controllers\Front;

use App\Events\JobApplicationReceivedEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\Job;
use Inertia\Inertia;

class StoreJobApplicationController extends Controller
{
    public function store(StoreJobApplicationRequest $request, Job $job)
    {
        // get validated fields
        $validated = $request->validated();

        // append resume
        $validated["resume"] = $request->file("resume")->store("resumes");

        // append coverLetter
        $validated["cover_letter"] = request("coverLetter");

        // create job application
        $application = $job->applications()->create($validated);

        // fire events
        event(new JobApplicationReceivedEvent($application));

        // redirect with success message
        return redirect()->route("jobApplicationReceived", ["job" => $job]);
    }

    public function applicationReceived(Job $job)
    {
        return Inertia::render("JobApplicationReceived", compact("job"));
    }
}
