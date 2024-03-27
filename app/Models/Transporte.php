<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transporte extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'numero_personas', 'id_invitacion'];

    // Relación con el modelo Invitacion
    public function invitacion()
    {
        return $this->belongsTo(Invitacion::class, 'id_invitacion', 'id');
    }
}
