<?php

$html = $id -> html ;

$css = $id -> style ;

$idComponent = $id -> id ;

$label = $id -> label ;


?>

@extends('layouts.dashboard')

@section('title', 'Inicio - Dashboard')

@section('navbar')
    @include('includes.navbarAdmin')
@endsection

@section('content')
    @include('layouts.navigation')

    <div class="container my-5">
        <div class="text-center">
        <span class="textoComponente">{{$id -> nombre}}-{{$id -> template -> name}}</span>
        </div>
        <br>
        <br>
        <span class="etiquetaCodigo">Codigo Html</span>
        <textarea   name="" id="code" cols="30" rows="10" style="width:100%;">
        </textarea>
        <br>
        <br>
        <span class="etiquetaCodigo">Codigo Css</span>
        <textarea   name="" id="code2" cols="30" rows="10" style="width:100%;">
        </textarea>
        <br>
        <br>
        <span class="etiquetaCodigo">Url Imagen Componente</span>
        <br>
        <input name="urlImagen" class="inputUrl" type="text" value="{{$id->label}}">
        <div class="text-end p-4" style="text-align: end">
            <button id="guardarBtn" class="btn btn-success">Guardar</button>
        </div>

    </div>

    

@section('script')
      
    <script src="/script/mirror.js"></script>
    <script>

            function html_entity_decode(str) {
                if (str === null || str === undefined) {
                    return ''; // o cualquier otro valor predeterminado que desees
                }
                return str.replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'");
            }


            var contenidoHTML = @json($html);

            var contenidoCss = @json($css);

            var idComponent = {!! $idComponent !!};

            var token = '{{ csrf_token() }}';


            var htmlfinal = contenidoHTML.replace(/&amp;/g, '&');

            console.log(htmlfinal);


            var stringGrapes = '';
            var jsondata = {};

            //var contenidoHTML = @json($html);

            console.log(htmlfinal);

            var decodedHTML = html_entity_decode(htmlfinal);

            var decodedCss = html_entity_decode(contenidoCss);


            // Establece el contenido en el editor
            editor.setValue(decodedHTML);

            editor2.setValue(decodedCss);

            $('#guardarBtn').on('click', function() {

            var inputUrl = document.querySelector('.inputUrl');

            var urlImagen = inputUrl.value;

            var url = '/admin/updateComponent/';

            var contenido1 = editor.getValue();

            var contenido2 = editor2.getValue();
            
                $.ajax({
                    type: 'POST',
                    url: url,
                    headers: {
                    'X-CSRF-TOKEN': token
                    },
                    data: {
                        campo1: contenido1,
                        campo2: contenido2,
                        campo3: idComponent,
                        campo4: urlImagen
                    },
                    success: function(response) {
                        console.log(response.mensaje);
                        location.reload();
                    },
                    error: function(error) {
                        console.error('Error al guardar datos:', error);
                    }
                });
            });
    </script>
    
@endsection


@endsection