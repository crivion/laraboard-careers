<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laraboard:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates an admin user for the platform with the given credentials.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $email = $this->ask('Specify an email for the admin user:');

        if(!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Email is required (valid).');
            return 1;
        }

        $password = $this->secret('Specify a password for the admin user:');
        if(!$password) {
            $this->error('Password is required.');
            return 1;
        }
        
        $name = $this->ask('Specify a name for the admin user:', 'Admin');
        if(!$name) {
            $this->error('Name is required.');
            return 1;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'user_type' => 'admin'
        ]);

        $this->info('Admin user created successfully.');
        $this->info(route('login'));

        return 0;
        
    }
}
