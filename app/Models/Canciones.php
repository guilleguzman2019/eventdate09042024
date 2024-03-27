<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canciones extends Model
{
    protected $fillable = ['nombre', 'autor', 'link', 'id_invitacion'];
    
    protected $table = 'canciones'; // Nombre de la tabla en la base de datos

    // Relación con el modelo Invitacion
    public function invitacion()
    {
        return $this->belongsTo(Invitacion::class, 'id_invitacion', 'id');
    }
}
