<?php

namespace App\Models;

use App\Traits\HumanDate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobApplication extends Model
{
    use HasFactory, HumanDate;

    protected $appends = ['humanCreatedAt'];

    protected $fillable = [
        'job_id',
        'name',
        'email',
        'phone',
        'cover_letter',
        'resume',
        'status',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function scopeOnMyJobs($query) {
        if(auth()->user()->isAdmin()) {
            return $query;
        }
        return $query->whereHas('job', function($query) {
            $query->where('jobs.user_id', auth()->id());
        });

    }

    public function scopeApplyFilters($query, Request $request) {
        
        if($request->filled('applicant')) {
            $query->where('name', 'like', '%' . $request->applicant . '%');
        }

        if($request->filled('jobId')) {
            $query->whereHas('job', function($query) use ($request) {
                $query->where('jobs.id', $request->jobId);
            });
        }

        if($request->filled('department_id')) {
            $query->whereHas('job', function($query) use ($request) {
                $query->where('department_id', $request->department_id);
            });
        }

        if($request->filled('location_id')) {
            $query->whereHas('job', function($query) use ($request) {
                $query->where('location_id', $request->location_id);
            });
        }

        if($request->filled('applicant_status')) {
            $query->where('status', $request->applicant_status);
        }

    }
}
