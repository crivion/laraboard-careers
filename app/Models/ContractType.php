<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractType extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract_type_name',
    ];

    // no timestamps
    public $timestamps = false;

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
