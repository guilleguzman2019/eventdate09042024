<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Component;
use App\Models\Template;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    //componentes

    public function componentes()
    {
        $componentes = Component::all();

        // Pasa las invitaciones a la vista 'panel.invitaciones'
        return view('admin.componentes', ['componentes' => $componentes]);
    }


    public function EditComponent(Component $id)
    {

        return view('admin.editComponent', compact('id'));
    }

    public function builder(Component $id)
    {

        $id = $id -> id;

        $componente = Component::with('template')->find($id);


        return view('admin.builder', ['componente' => $componente]);
    }

    public function updateComponent(Request $request)
    {


        $request->validate([
            'campo1' => 'required',
            'campo2' => 'required',
            'campo3' => 'required',
            'campo4' => 'required',
        ]);

        $id = $request->input('campo3');

        // Buscar el modelo existente o crear uno nuevo
        $modelo = Component::findOrFail($id);

        // Asignar valores
        $modelo->html = $request->input('campo1');
        $modelo->style = $request->input('campo2');
        $modelo->label = $request->input('campo4');

        $modelo->save();

        return response()->json(['mensaje' => 'Datos guardados correctamente'], 200);


    }

    //templates

    public function templates(Request $request)
    {

        $templates = Template::all();
        $categorias = Category::all();

        // Pasa las invitaciones a la vista 'panel.invitaciones'
        return view('admin.templates', ['templates' => $templates, 'categorias' => $categorias]);

    }

    public function crearTemplate(Request $request)
    {
        // Obtener todos los datos de la solicitud
        $data = $request->all();

        // Definir reglas de validación
        $rules = [
            'name' => 'required|string',
            'image' => 'required',
            'category_id' => 'required',
        ];

        // Crear un objeto Validator
        $validator = Validator::make($data, $rules);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 400);
        }

        // Crear un nuevo Template con los datos validados
        $template = Template::create($validator->validated());

        // Devolver una respuesta exitosa
        return response()->json(['message' => 'Operación exitosa']);
    }

    public function upload(Request $request)
    {
        // Verificar si el archivo 'imagen' está presente en la solicitud
        if ($request->hasFile('imagen') && $request->file('imagen')->isValid()) {
            // Obtener el archivo 'imagen'
            $imagen = $request->file('imagen');

            $folder = $request->input('folder');

            // Generar un nombre único para el archivo
            $nombreArchivo = uniqid() . '_' . $imagen->getClientOriginalName();

            // Guardar el archivo en el sistema de archivos de Laravel (en el disco 'public')
            $rutaImagen = Storage::disk('public')->putFileAs($folder, $imagen, $nombreArchivo);

            dd($rutaImagen);

            $data = [
                'ruta_imagen' => Storage::url($rutaImagen),
            ];

            return response()->json(['data' => $data], 200);
        }

        return response()->json(['error' => 'No se ha enviado un archivo válido.'], 400);
    }

    public function editarTemplate(Request $request)
    {

        dd($request);

    }

    public function deleteTemplate(Request $request)
    {

        $id = $request->input('id');

        try {
            // Encuentra y elimina la invitación
            $template = Template::findOrFail($id);

            $template->delete();

            // Puedes devolver una respuesta JSON si es necesario
            return response()->json(['success' => true, 'message' => 'template eliminada con éxito']);
        } catch (\Exception $e) {
            // Maneja cualquier excepción que pueda ocurrir durante el proceso de eliminación
            return response()->json(['success' => false, 'message' => 'Error al eliminar la template'], 500);
        }

    }

    //categoria

    public function categorias(Request $request)
    {

        $categorias = Category::all();

        // Pasa las invitaciones a la vista 'panel.invitaciones'
        return view('admin.categorias', ['categorias' => $categorias]);

    }

    public function crearCategoria(Request $request)
    {

        $data = $request->all();

        // Definir reglas de validación
        $rules = [
            'nombre' => 'required|string',
        ];

        // Crear un objeto Validator
        $validator = Validator::make($data, $rules);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 400);
        }

        // Crear un nuevo Template con los datos validados
        $template = Category::create($validator->validated());

        // Devolver una respuesta exitosa
        return response()->json(['message' => 'Operación exitosa']);

    }

    public function editarCategoria(Request $request){


        $requestData = $request->all();

        // Validador con reglas para la actualización
        $validator = Validator::make($requestData, [
            'nombre' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()], 200);
        }

        // Encuentra la invitación existente por ID
        $categoria = Category::findOrFail($request->id);

        // Actualiza los campos de la invitación
        $categoria->update($validator->validated());

        return response()->json(['message' => 'Operación exitosa']);
    }

    public function eliminarCategoria(Request $request)
    {

        $id = $request->input('id');

        try {
            // Encuentra y elimina la invitación
            $categoria = Category::findOrFail($id);

            $categoria->delete();

            // Puedes devolver una respuesta JSON si es necesario
            return response()->json(['success' => true, 'message' => 'categoria eliminada con éxito']);
        } catch (\Exception $e) {
            // Maneja cualquier excepción que pueda ocurrir durante el proceso de eliminación
            return response()->json(['success' => false, 'message' => 'Error al eliminar la categoria'], 500);
        }

    }

    public function upload2(Request $request)
    {

        $imagen = $request->file('imagen');

        $folder = $request->input('folder');

        $nombreArchivoOriginal = $imagen->getClientOriginalName();
    
        // Guardar la imagen en el sistema de archivos de Laravel (en el disco 'public')
        //Storage::disk('public')->putFileAs('uploads', $imagen, $nombreArchivoOriginal);

        Storage::disk('public')->putFileAs('uploads/'.$folder, $imagen, $nombreArchivoOriginal);
    
        $data = [
            'nombre_imagen' => $nombreArchivoOriginal
        ];
    
        return response()->json(['data' => $data], 200);
    }


}
