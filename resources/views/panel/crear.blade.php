@extends('layouts.dashboard')

@section('title', 'Inicio - Dashboard')

@section('navbar')
    @include('includes.navbarPanel')
@endsection

@section('content')
    @include('layouts.navigation')
    <br>
    <div class="container-fluid">
        <div class="content text-center">
            <h1 class="tituloSeccion">Diseña tu Invitacion a tu gusto.</h1>
            <span class="frases"> "El adulto creativo es el niño que sobrevivió." —Ursula Leguin </span>
            <div class="tag-buttons-container text-center pt-5">
          
                <div class="tag-buttons">
                    <button class="tag-button active" data-tag="all"> All </button>
                    <button class="tag-button" data-tag="category-1">Casamiento</button>
                    <button class="tag-button" data-tag="category-2">Cumpleaños</button>
                    <button class="tag-button" data-tag="category-3">Quince años</button>
                    <button class="tag-button" data-tag="category-3">Empresariales</button>
                    <button class="tag-button" data-tag="category-3">Funeraria</button>
                    <!-- Add more buttons for your tags here -->
                </div>
            </div>
            <div class="contenidoOwl text-center mt-3">
                <div class="owl-carousel carusel">

                    <div class="item">
                    <img src="https://eventdate.es/wp-content/uploads/2022/09/MODELO-7-530x1024.png" alt="Imagen 1" width="100px">
                    <input type="checkbox" id="" value="second_checkbox">
                    </div>

                    <div class="item">
                        <img src="https://eventdate.es/wp-content/uploads/2022/09/MODELO-4-553x1024.png" alt="Imagen 1" width="100px">
                        <input type="checkbox" id="" value="second_checkbox">
                    </div>

                    <div class="item">
                        <img src="https://eventdate.es/wp-content/uploads/2022/09/MODELO-5-558x1024.png" alt="Imagen 1" width="100">
                        <input type="checkbox" id="" value="second_checkbox">
                    </div>

                    <div class="item">
                        <img src="https://eventdate.es/wp-content/uploads/2022/09/MODELO-7-530x1024.png" alt="Imagen 1" width="100">
                        <input type="checkbox" id="" value="second_checkbox">
                    </div>

                    <div class="item">
                        <img src="https://eventdate.es/wp-content/uploads/2022/09/MODELO-6-530x1024.png" alt="Imagen 1" width="100">
                        <input type="checkbox" id="" value="second_checkbox">
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection