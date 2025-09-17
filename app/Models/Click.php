<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    protected $fillable = [
        'link_id',
        'browser',
        'os',
        'country_name',
        'city_name',
    ];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
