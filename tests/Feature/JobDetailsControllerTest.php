<?php

namespace Tests\Feature\Front;

use App\Models\Job;
use App\Models\Department;
use App\Models\Location;
use App\Models\ContractType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class JobDetailsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_job_details_rendered_correctly()
    {
        // Create some dummy data
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
        $job->load(["department", "location", "contractType", "user"]);

        // Send a GET request to the job details endpoint
        $response = $this->get(route("jobDetails", $job));

        // Assert that the response was successful
        $response->assertSuccessful();

        // Assert that the JobDetails component is rendered
        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->has("job.id")
                ->has("job.job_title")
                ->has("job.job_description")
                ->has("job.key_responsibilities")
                ->has("job.skills_and_experience")
                ->has("job.salary")
                ->has("job.department")
                ->has("job.location")
                ->has("job.contract_type")
                ->has("job.user")
        );
    }
}
