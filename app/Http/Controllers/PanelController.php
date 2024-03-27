<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use \App\models\Invitacion;
use App\Models\Component;
use App\Models\Canciones;
use App\Models\Confirmado;
use App\Models\Transporte;
use App\Models\Template;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;

class PanelController extends Controller
{

    public function index()
    {

        $user = Auth::user();

        $invitacionesCantidad = Invitacion::where('user_id', $user->id)->count();
        $transporteCantidad = Transporte::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->count();
        $confirmadosCantidad = Confirmado::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->count();
        $cancionesCantidad = Canciones::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->count();

        return view('panel.index' , ['invitacionesCantidad' => $invitacionesCantidad , 'transporteCantidad' => $transporteCantidad, 'confirmadosCantidad' => $confirmadosCantidad, 'cancionesCantidad' => $cancionesCantidad]); // Ajusta según la estructura de tus vistas
    }

    public function crear()
    {
        return view('panel.crear'); // Ajusta según la estructura de tus vistas
    }

    public function invitaciones()
    {
        $user = Auth::user();

        $invitaciones = Invitacion::where('user_id', $user->id)->get();

        $templates = Template::all();

        $categorias = Category::all();

        // Pasa las invitaciones a la vista 'panel.invitaciones'
        return view('panel.invitaciones', ['invitaciones' => $invitaciones, 'templates' => $templates, 'categorias' => $categorias]);
    }



    public function builder(Invitacion $slug)
    {

        $invitacion = $slug ;

        $categoria = $slug -> template -> name ;


        $components = Component::whereHas('template', function ($query) use ($categoria) {
            $query->where('name', $categoria);
        })->get();

        //$components = Component::with('template')->get();


        return view('panel.builder' , ['componentes' => $components, 'invitacion' => $invitacion]);
    }

    public function editarInvitacion(Request $request)
    {


        // Obtén el slug del título
        $slug = Str::slug($request->titulo);

        $requestData = $request->all();

        // Agrega el slug a los datos de la solicitud
        $requestData['slug'] = $slug;

        // Validador con reglas para la actualización
        $validator = Validator::make($requestData, [
            'titulo' => 'required|string',
            'template_id' => 'required',
            'slug' => [
                Rule::unique('invitacions', 'slug')->ignore($request->id),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 200);
        }

        // Encuentra la invitación existente por ID
        $invitacion = Invitacion::findOrFail($request->id);

        // Actualiza los campos de la invitación
        $invitacion->update($validator->validated());

        return response()->json(['message' => 'Operación exitosa']);

        
    }

    public function eliminarInvitacion(Request $request)
    {
        $invitacionId = $request->input('invitacionId');

        try {
            // Encuentra y elimina la invitación
            $invitacion = Invitacion::findOrFail($invitacionId);
            $invitacion->delete();

            // Puedes devolver una respuesta JSON si es necesario
            return response()->json(['success' => true, 'message' => 'Invitación eliminada con éxito']);
        } catch (\Exception $e) {
            // Maneja cualquier excepción que pueda ocurrir durante el proceso de eliminación
            return response()->json(['success' => false, 'message' => 'Error al eliminar la invitación'], 500);
        }


    }

    
    public function saveData(Request $request)
    {

        // Aquí puedes acceder a los datos JSON enviados en la solicitud
        $data = $request->json()->all();

        


        $invitacionId = $data['id']; // Ajusta según tu estructura de datos

        // Buscar la Invitacion por su ID
        $invitacion = Invitacion::find($invitacionId);


        if ($invitacion) {

            if($data['tipo'] == 'data' ){

                $invitacion->update(['data' => $data['data']]); // Ajusta según tu estructura de datos
            }

            else{
                $invitacion->update(['assets' => $data['data']]); // Ajusta según tu estructura de datos
            }
        }

        
    }

    public function mercadopago(Request $request)
    {

        $idInvitacion = $request -> invitacionId;

        $invitacion = Invitacion::find($idInvitacion);

        $categoria = $invitacion -> template -> category -> nombre;


        // Datos para la solicitud
        $data = [
            "cash_out" => [
                "amount" => 0
            ],
            "description" => "compra de invitacion",
            "external_reference" => '',
            "items" => [
                [
                    "sku_number" => $idInvitacion,
                    "category" => $categoria,
                    "title" => "Invitacion Digital",
                    "description" => "invitacion digital para fiestas multiples",
                    "unit_price" => 5,
                    "quantity" => 1,
                    "unit_measure" => "unit",
                    "total_amount" => 5
                ]
            ],
            "notification_url" => "http://127.0.0.1:8000/panel/notificacion",
            "sponsor" => [
                "id" => 26295068
            ],
            "title" => "Product order",
            "total_amount" => 5
        ];

        // Convertir los datos a formato JSON
        $jsonData = json_encode($data);

        // URL de la solicitud
        $url = 'https://api.mercadopago.com/instore/qr/seller/collectors/669368816/stores/SUC001/pos/POS001/orders';

        // Cabeceras de la solicitud
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer APP_USR-1336491087316350-092918-dc275ce34f94ed9e28263ad4f4dfa5aa-669368816'
        ];

        // Inicializar la sesión cURL
        $ch = curl_init();

        // Configurar opciones de cURL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Ejecutar la sesión cURL y obtener la respuesta
        $response = curl_exec($ch);

        // Verificar si hay errores
        if (curl_errno($ch)) {
            echo 'Error en la solicitud cURL: ' . curl_error($ch);
            // Puedes agregar lógica adicional si hay un error, por ejemplo, devolver false
            header('Content-Type: application/json');
            echo json_encode(['success' => false]);
        } else {
            // Si la solicitud se realizó correctamente, devolver true
            header('Content-Type: application/json');
            echo json_encode(['success' => true]);
        }

        // Cerrar la sesión cURL
        curl_close($ch);


    }

    public function notificacion(Request $request){


    }

    public function crearInvitacion(Request $request)
    {

        $user = Auth::user();

        $slug = Str::slug($request->titulo);

        $requestData = $request->all();
        $requestData['slug'] = $slug;
        $requestData['user_id'] = $user->id;

    
        $validator = Validator::make($requestData, [
            'titulo' => 'required|string',
            'template_id' => 'required',
            'data' => 'required|string',
            'assets' => 'required|string',
            'status' => 'required|string',
            'slug' => [
                Rule::unique('invitacions', 'slug'),
            ],
            'user_id' => 'required'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 400);
        }
    
    
        $invitacion = Invitacion::create($validator->validated());
    
        return response()->json(['message' => 'Operación exitosa']);
    }


    public function upload(Request $request)
    {

        $imagen = $request->file('files')[0]; // Obtener el primer archivo

        $folder = $request->input('folder');

        $nombreArchivoOriginal = $imagen->getClientOriginalName();
    
        // Guardar la imagen en el sistema de archivos de Laravel (en el disco 'public')
        Storage::disk('public')->putFileAs('uploads/'.$folder, $imagen, $nombreArchivoOriginal);
    
        $data = [
            'nombre_imagen' => $nombreArchivoOriginal
        ];
    
        return response()->json(['data' => $data], 200);
    }

    public function upload2(Request $request)
    {

        // Verificar si hay un archivo en la solicitud
        if ($request->hasFile('imagen')) {
            // Obtener el archivo de la solicitud
            $imagen = $request->file('imagen');

            $folder = $request->input('folder');
            
            // Generar un nombre único para el archivo
            $nombreArchivoOriginal = $imagen->getClientOriginalName();
            
            // Guardar la imagen en el almacenamiento local (public)
            Storage::disk('public')->putFileAs('uploads/'.$folder, $imagen, $nombreArchivoOriginal);
            
            // Crear un array con los datos de respuesta
            $data = [
                'nombre_imagen' => $nombreArchivoOriginal
            ];
            
            // Devolver una respuesta JSON con los datos de la imagen guardada
            return response()->json([$data], 200);
        } else {
            // Si no se encontró ningún archivo en la solicitud, devolver un error
            return response()->json(['error' => 'No se encontró ningún archivo en la solicitud.'], 400);
        }
    }


    public function musica()
    {

        $user = Auth::user();

        $canciones = Canciones::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->get();

        return view('panel.musica' , ['canciones' => $canciones]);

    }

    public function songs(Request $request)
    {
        // Validar los datos del formulario si es necesario
        $request->validate([
            'nombre' => 'required|string',
            'autor' => 'required|string',
            'link' => 'required|string',
        ]);

        // Crear una nueva instancia de Canciones con los datos del formulario
        $cancion = new Canciones([
            'nombre' => $request->nombre,
            'autor' => $request->autor,
            'link' => $request->link,
            'id_invitacion' => $request->id, // Asegúrate de ajustar el nombre según lo que envías desde el formulario
        ]);

        // Guardar la nueva canción en la base de datos
        $cancion->save();

        // Puedes devolver una respuesta JSON si es necesario
        return response()->json(['message' => 'Canción creada correctamente']);
    }

    public function confirmados()
    {

        $user = Auth::user();

        $confirmados = Confirmado::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->get();

        return view('panel.confirmado' , ['confirmados' => $confirmados]);

    }

    public function transporte()
    {

        $user = Auth::user();

        $transporte = Transporte::whereIn('id_invitacion', $user->invitaciones->pluck('id'))->get();

        return view('panel.transporte' , ['transporte' => $transporte]);

    }

    public function confirmation(Request $request)
    {

        // Validar los datos del formulario si es necesario
        $request->validate([
            'asiste' => 'required|string',
            'nombre' => 'required|string',
            'dato' => 'required|string',
        ]);

        // Crear una nueva instancia de Canciones con los datos del formulario
        $confirmacion = new Confirmado([
            'nombre_completo' => $request->nombre,
            'dato_importante' => $request->dato,
            'asiste' => $request->asiste,
            'id_invitacion' => $request->id, // Asegúrate de ajustar el nombre según lo que envías desde el formulario
        ]);

        // Guardar la nueva canción en la base de datos
        $confirmacion->save();

        // Puedes devolver una respuesta JSON si es necesario
        return response()->json(['message' => 'Confirmacion creada correctamente']);

    }

    public function transport(Request $request)
    {

        $request->validate([
            'nombre' => 'required|string',
            'cantidad' => 'required|string',
        ]);

        // Crear una nueva instancia de Canciones con los datos del formulario
        $transporte = new Transporte([
            'nombre' => $request->nombre,
            'numero_personas' => $request->cantidad,
            'id_invitacion' => $request->id, // Asegúrate de ajustar el nombre según lo que envías desde el formulario
        ]);

        // Guardar la nueva canción en la base de datos
        $transporte->save();

        // Puedes devolver una respuesta JSON si es necesario
        return response()->json(['message' => 'transporte creado correctamente']);

    }

    public function sucess(Request $request){

        // Obtener el valor de external_reference desde la solicitud GET
        $externalReference = $request->query('external_reference');

        // Consultar el modelo Invitacion con el external_reference proporcionado
        $invitacion = Invitacion::where('id', $externalReference)->first();

        // Verificar si se encontró una invitación con el external_reference proporcionado
        if ($invitacion) {
            // Cambiar el estatus de la invitación de pendiente a pagada
            $invitacion->status = 'pagada';
            $slug = $invitacion-> slug;
            $invitacion->save();

            return Redirect::route('panel.builder', ['slug' => $slug]);
        } else {
            return Redirect::route('panel.invitaciones');
        }
    }

    public function failed(Request $request){

        // Obtener el valor de external_reference desde la solicitud GET
        $externalReference = $request->query('external_reference');

        // Consultar el modelo Invitacion con el external_reference proporcionado
        $invitacion = Invitacion::where('id', $externalReference)->first();

        // Verificar si se encontró una invitación con el external_reference proporcionado
        if ($invitacion) {
            $slug = $invitacion-> slug;

            return Redirect::route('panel.builder', ['slug' => $slug]);
        } else {
            return Redirect::route('panel.invitaciones');
        }
    }

        
}
