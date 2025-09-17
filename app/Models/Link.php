<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'target_url',
        'unique_code',
        'prefix_id',
        'expired_at',
    ];

    public function prefix()
    {
        return $this->belongsTo(Prefix::class);
    }

    public function clicks()
    {
        return $this->hasMany(Click::class);
    }
}
