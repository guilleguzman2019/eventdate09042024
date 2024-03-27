<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'label', 'html', 'style', 'id_template'];

    public function template()
    {
        return $this->belongsTo(Template::class, 'id_template');
    }

    public function hijo()
    {
        return $this->belongsTo(Component::class, 'componentHijo');
    }

    public function padres()
    {
        return $this->hasMany(Component::class, 'componentHijo');
    }
}
