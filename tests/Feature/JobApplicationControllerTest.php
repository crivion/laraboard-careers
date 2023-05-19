<?php

namespace Tests\Unit\Controllers\Front;

use App\Events\JobApplicationReceivedEvent;
use App\Models\Job;
use App\Models\Department;
use App\Models\Location;
use App\Models\ContractType;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Inertia\Inertia;
use Inertia\Testing\AssertableInertia;
use Mockery;
use Tests\TestCase;

class StoreJobApplicationControllerTest extends TestCase
{
    public function test_cannot_send_job_application_without_accepting_terms()
    {
        // create a job
        $department = Department::factory()->create();
        $location = Location::factory()->create();
        $contractType = ContractType::factory()->create();
        $user = User::factory()->create();

        $job = Job::factory()->create([
            "department_id" => $department->id,
            "location_id" => $location->id,
            "contract_type_id" => $contractType->id,
            "user_id" => $user->id,
        ]);

        $job = Job::factory()->create();

        $response = $this->post(route("storeJobApplication", ["job" => $job]), [
            "name" => "Test User",
            "email" => "test@user.com",
            "resume" => UploadedFile::fake()->create("resume.pdf"),
            "coverLetter" => "This is a cover letter",
            "phone" => "1234567890",
        ]);

        // assert errors: phone is required and terms is required
        $response->assertSessionHasErrors(["terms"]);
    }

    public function test_can_apply_if_form_is_complete()
    {
        // create a job
        $department = Department::factory()->create();
        $location = Location::factory()->create();
        $contractType = ContractType::factory()->create();
        $user = User::factory()->create();

        $job = Job::factory()->create([
            "department_id" => $department->id,
            "location_id" => $location->id,
            "contract_type_id" => $contractType->id,
            "user_id" => $user->id,
        ]);

        $job = Job::factory()->create();

        // call event fake after the factory (to allow slug to be autocreated)
        Event::fake();

        $response = $this->post(route("storeJobApplication", ["job" => $job]), [
            "name" => "Test User",
            "email" => "test@user.com",
            "resume" => UploadedFile::fake()->create("resume.pdf"),
            "coverLetter" => "This is a cover letter",
            "phone" => "1234567890",
            "terms" => true,
        ]);

        // assert that the event was dispatched
        Event::assertDispatched(JobApplicationReceivedEvent::class);

        $response->assertRedirect(
            route("jobApplicationReceived", ["job" => $job])
        );

        // request the job application received page
        $response = $this->get(
            route("jobApplicationReceived", ["job" => $job])
        );

        // assert the inertia page
        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component("JobApplicationReceived")
                ->has("job")
                ->has("job.job_title")
        );
    }
}
