<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JobApplication;
use Illuminate\Auth\Access\HandlesAuthorization;

class JobApplicationPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobApplication  $job
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, JobApplication $jobApplication)
    {
        return $jobApplication->job->user_id === $user->id;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobApplication  $job
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function updateStatus(User $user, JobApplication $jobApplication)
    {
        return $jobApplication->job->user_id === $user->id;
    }
}
