<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Confirmado extends Model
{
    use HasFactory;

    protected $fillable = ['nombre_completo', 'dato_importante', 'asiste', 'id_invitacion'];

    public function invitacion()
    {
        return $this->belongsTo(Invitacion::class, 'id_invitacion', 'id');
    }
}
