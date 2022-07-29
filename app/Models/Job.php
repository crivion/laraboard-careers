<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'slug',
        'job_description',
        'key_responsibilities',
        'skills_and_experience',
        'salary',
        'location_id',
        'user_id',
        'contract_type_id',
        'created_at',
        'expires_at',
        'updated_at',
        'deleted_at'
    ];
}
