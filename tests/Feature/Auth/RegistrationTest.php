<?php

namespace Tests\Feature\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_is_disabled()
    {
        $response = $this->get("/register");

        $response->assertStatus(404);
    }

    public function test_registration_does_not_allow_new_users()
    {
        $response = $this->post("/register", [
            "name" => "Test User",
            "email" => "test@example.com",
            "password" => "password",
            "password_confirmation" => "password",
        ]);

        $response->assertStatus(404);
    }
}
