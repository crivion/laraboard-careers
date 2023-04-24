<?php

namespace App\Models;

use App\Traits\HumanDate;
use Illuminate\Http\Request;
use Spatie\Sluggable\HasSlug;
use Illuminate\Support\Carbon;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory;
    use HasSlug;
    use HumanDate;
    use SoftDeletes;

    protected $fillable = [
        "job_title",
        "slug",
        "job_description",
        "key_responsibilities",
        "skills_and_experience",
        "salary",
        "location_id",
        "user_id",
        "contract_type_id",
        "department_id",
        "created_at",
        "expires_at",
        "updated_at",
        "deleted_at",
    ];

    protected $appends = ["isExpired", "humanCreatedAt"];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom("job_title")
            ->saveSlugsTo("slug");
    }

    public function getRouteKeyName()
    {
        return "slug";
    }

    public function scopeNotExpired($query)
    {
        return $query->where(function ($query) {
            $query->where("expires_at", ">", now())->orWhereNull("expires_at");
        });
    }

    public function getIsExpiredAttribute()
    {
        if (is_null($this->expires_at)) {
            return false;
        }

        return $this->expires_at < now();
    }

    public function scopeApplyFilters($query, Request $request)
    {
        if ($request->filled("keyword")) {
            $query->where(function ($query) use ($request) {
                $query
                    ->where("job_title", "like", "%" . $request->keyword . "%")
                    ->orWhere(
                        "job_description",
                        "like",
                        "%" . $request->keyword . "%"
                    )
                    ->orWhere(
                        "key_responsibilities",
                        "like",
                        "%" . $request->keyword . "%"
                    )
                    ->orWhere(
                        "skills_and_experience",
                        "like",
                        "%" . $request->keyword . "%"
                    );
            });
        }

        if ($request->filled("department")) {
            $query->where("department_id", $request->department);
        }

        if ($request->filled("contractType")) {
            $query->where("contract_type_id", $request->contractType);
        }

        if ($request->filled("location")) {
            $query->where("location_id", $request->location);
        }
    }

    public function scopePostedByMe($query)
    {
        if (
            auth()
            ->user()
            ->isAdmin()
        ) {
            return $query;
        }
        return $query->where("user_id", auth()->user()->id);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function contractType()
    {
        return $this->belongsTo(ContractType::class);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function getExpiresAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->format("Y-m-d") : null;
    }
}
