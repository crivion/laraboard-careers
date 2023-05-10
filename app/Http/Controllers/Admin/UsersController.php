<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use App\Notifications\AccountCreatedNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize("viewAny", auth()->user());

        $users = User::withCount("jobs")
            ->orderByDesc("id")
            ->paginate(10);
        return Inertia::render("Dashboard/Users", compact("users"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize("viewAny", auth()->user());

        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "user_type" => "required|in:admin,hr-representative",
        ]);

        // generate a password
        $password = Str::random(12);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "user_type" => $request->user_type,
            "password" => Hash::make($password),
            "contact_phone" => $request->contact_phone,
        ]);

        // send email to user with password
        $user->notify(new AccountCreatedNotification($user, $password));

        session()->flash(
            "success",
            "User successfully created and account details mailed."
        );

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize("view", $user, auth()->user());

        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize("view", $user, auth()->user());

        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users,email," . $user->id,
            "user_type" => "required|in:admin,hr-representative",
        ]);

        $user->update([
            "name" => $request->name,
            "email" => $request->email,
            "user_type" => $request->user_type,
            "contact_phone" => $request->contact_phone,
        ]);

        session()->flash("success", "User successfully updated.");

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize("viewAny", auth()->user());

        // delete application to this job posted by the user
        JobApplication::whereIn("job_id", $user->jobs->pluck("id"))->delete();

        // delete the jobs
        Job::whereIn("id", $user->jobs->pluck("id"))->delete();

        // finally, remove the user
        $user->delete();

        session()->flash(
            "success",
            "Successfully deleted user and all related data."
        );

        return back();
    }
}
