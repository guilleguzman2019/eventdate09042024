<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo', 'status', 'data', 'assets', 'template_id', 'slug', 'user_id',
    ];

    

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function canciones()
    {
        return $this->hasMany(Canciones::class, 'id_invitacion', 'id');
    }

    public function getRouteKeyName(): string {
        return 'slug';
    }
}
