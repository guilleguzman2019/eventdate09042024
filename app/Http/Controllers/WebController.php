<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Invitacion;
use App\Models\Component;
use App\Models\Template;

class WebController extends Controller
{
    public function invitacion(Invitacion $slug)
    {

        if($slug ->status == 'pendiente'){

            return view('web.PagarInvitacion');

        }

        $componentArray = [];

        $template = $slug ->template -> name;

        $invitacion  = $slug;

        $data = $slug -> data ;

        $arrayAsociativo = json_decode($data, true);

        foreach ($arrayAsociativo as $clave => $valor) {

            $palabras = explode("-", $clave);

            $component = Component::where('nombre', $palabras[0])
                        ->whereHas('template', function ($query) use ($palabras) {
                            $query->where('name', $palabras[1]);
                        })
                        ->first();

            
            array_push($componentArray, $component);
        }


        return view('web.invitacion', ['invitacion' => $invitacion, 'componentes' => $componentArray]);
    }
}
