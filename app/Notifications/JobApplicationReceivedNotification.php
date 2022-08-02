<?php

namespace App\Notifications;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobApplicationReceivedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $application;

    public function __construct(JobApplication $application)
    {
        $this->application = $application;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject(__('New Job Application'))
                    ->line(__('Hey :name,', ['name' => $notifiable->name]))
                    ->line(__('You have just received a new job application for :job', ['job' => $this->application->job->job_title]))
                    ->line(__('Applicant name: :applicantName', ['applicantName' => $this->application->name]))
                    ->line(__('Applicant phone: :applicantPhone', ['applicantPhone' => $this->application->phone]))
                    ->line(__('Applicant email: :applicantEmail', ['applicantEmail' => $this->application->email]))
                    ->action(__('Go to dashboard'), url('/'))
                    ->line(__('Regards'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
