<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Job extends Model
{
    use HasFactory, HasSlug;

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

    protected $appends = [
        'isExpired'
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('job_title')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeNotExpired($query) {
        return $query->where('expires_at', '>', now());
    }

    public function getIsExpiredAttribute() {
        return $this->expires_at < now();
    }

    public function scopeApplyFilters($query, Request $request) {

        if($request->filled('keyword')) {
            $query->where(function($query) use($request) {
                $query->where('job_title', 'like', '%'.$request->keyword.'%')
                    ->orWhere('job_description', 'like', '%'.$request->keyword.'%')
                    ->orWhere('key_responsibilities', 'like', '%'.$request->keyword.'%')
                    ->orWhere('skills_and_experience', 'like', '%'.$request->keyword.'%');
            });
        }

        if($request->filled('department')) {
            $query->where('department_id', $request->department);
        }

        if($request->filled('contractType')) {
            $query->where('contract_type_id', $request->contractType);
        }

        if($request->filled('location')) {
            $query->where('location_id', $request->location);
        }

        
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function location() {
        return $this->belongsTo(Location::class);
    }

    public function contractType() {
        return $this->belongsTo(ContractType::class);
    }
}