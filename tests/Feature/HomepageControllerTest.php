<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Job;
use App\Models\Department;
use App\Models\Location;
use App\Models\ContractType;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

class HomepageControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the home page.
     *
     * @return void
     */
    public function testHomePage()
    {
        // Create some dummy data
        $department = Department::factory()->create();
        $location = Location::factory()->create();
        $contractType = ContractType::factory()->create();
        $user = User::factory()->create();

        Job::factory()->create([
            "department_id" => $department->id,
            "location_id" => $location->id,
            "contract_type_id" => $contractType->id,
            "user_id" => $user->id,
        ]);

        // Simulate a request to the home page
        $response = $this->get("/");

        // Assert that the response was successful
        $response->assertStatus(200);

        // Assert that the Inertia view was rendered
        $response->assertInertia(
            fn(AssertableInertia $page) => $page->component("Homepage")
        );

        // Assert that the necessary data is passed to the view
        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->has("jobs")
                ->has("departments")
                ->has("locations")
                ->has("contractTypes")
                ->has("queryFilters")
        );
    }
}
