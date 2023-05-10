## About LaraBoard

Created for companies to have their own place for the HR department to advertise open job positions and allow applications on the same platform - LaraBoard Careers.

-   Simple, no bloating careers platform for your company
-   Powered by Laravel Framework - the best in the world
-   ReactJS Frontend via InertiaJS Laravel
-   The industry standard database - MySQL

## Frontpage Preview

![laraboard preview](https://raw.githubusercontent.com/crivion/laraboard-careers/master/public/assets/images/laraboard-preview.png)

## WORK IS IN PROGRESS

### Frontend

-   Homepage with all the open (not expired) job/careers listings
-   Search jobs by job title/keyword, department, contract type and location
-   View Individual Job Listing
-   Apply to Jobs (including attaching a PDF Resume)

### Dashboard (Admin / Backend)

-   View and filter Job applications (job, applicant name, applicant status, department, location)
-   View full details and update status (new, shortlisted, hired, interviewed, dismissed)
-   View and filter Jobs: View / Create 5/ Update / Delete Jobs
-   Filter jobs (title/keyword, department, location)
-   View/Download CV PDF File in job application details page
-   Delete job listing
-   Manage Departments
-   Manage Contract Types
-   Manage Locations

### Dashboard Preview

![laraboard dashboard](https://raw.githubusercontent.com/crivion/laraboard-careers/master/public/assets/images/admin-dashboard.png)
![laraboard jobs](https://raw.githubusercontent.com/crivion/laraboard-careers/master/public/assets/images/admin-jobs.png)

### Installation Instructions

1. Clone this repo: git clone https://github.com/crivion/laraboard-careers.git
2. Install composer dependencies: composer install
3. Copy .env.example => .env: cp .env.example .env
4. Configure your database credentials & smtp mail server details in the .env file
5. Migrate database: php artisan migrate
6. Generate an admin user to start with: php artisan laraboard:create-admin
7. You can login via https://yourdomain.com/dashboard with the user you created at step 6
8. Link storage folder (where cv pdf's are stored): php artisan storage:link
9. Install NPM Packages: npm install
10. Finally, build it: npm run build

And you're ready to advertise your available positions!

## License

The LaraBoard app is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
