<?php

namespace App\Listeners;

use App\Events\JobApplicationReceivedEvent;
use App\Notifications\JobApplicationReceivedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class JobApplicationListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\JobApplicationReceivedEvent  $event
     * @return void
     */
    public function handle(JobApplicationReceivedEvent $event)
    {
        // get job creator
        $user = $event->application->job->user;

        // queue (JobApplicationReceivedNotification implements ShouldQueue)
        $user->notify(new JobApplicationReceivedNotification($event->application));
    }
}
