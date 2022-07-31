<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {

            // schema
            $table->id();
            $table->string('job_title');
            $table->string('slug');
            $table->text('job_description');
            $table->text('key_responsibilities')->nullable();
            $table->text('skills_and_experience')->nullable();
            $table->string('salary')->nullable();
            $table->foreignId('department_id');
            $table->foreignId('location_id');
            $table->foreignId('user_id');
            $table->foreignId('contract_type_id');
            $table->dateTime('expires_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // full-text indexes
            $table->fullText('job_title');
            $table->fullText('job_description');
            $table->fullText('key_responsibilities');
            $table->fullText('skills_and_experience');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
