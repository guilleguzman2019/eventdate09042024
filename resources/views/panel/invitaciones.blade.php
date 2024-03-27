<?php

    $invitacionesJson = $invitaciones->map(function ($invitacion) {
        return [
            'id' => $invitacion->id,
            'titulo' => $invitacion->titulo,
            'status'   => $invitacion ->status,
            'slug'  => $invitacion -> slug,
            'template' => $invitacion->template->name,
            'idtemplate' => $invitacion->template_id,
        ];
    })->toJson();

    $templatesJson = $templates->map(function ($t) {
      return [
          'id' => $t->id,
          'name' => $t->name,
          'image'   => $t ->image,
          'selected' => false,
          'categoria' => $t ->category -> nombre
      ];
  })->toJson();


  $categoriasJson = $categorias->map(function ($c) {
    return [
        'id' => $c->id,
        'nombre' => $c->nombre,
    ];
})->toJson();

$appUrl = env('APP_URL');

?>


@extends('layouts.dashboard')

@section('title', 'Inicio - Dashboard')

@section('navbar')
    @include('includes.navbarPanel')
@endsection

@section('content')
    @include('layouts.navigation')
    
    <br>

    <script>

      var token = '{{ csrf_token() }}';

    </script>

    <script>

      var data = {!! $invitacionesJson !!};

      var templates = {!! $templatesJson !!};

      var categorias =  {!! $categoriasJson !!};

      var urlApp = '{!! $appUrl !!}';

      console.log(templates);

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container p-0">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Invitaciones</h2>
                            </div>
                            <div class="col-sm-6 text-end">
                                <a  class="btnFiltros btn btn-claro">
                                  <i class="fa-solid fa-filter"></i>
                                </a>	
                                <a href="#addEmployeeModal" class="btn btn-claro" data-toggle="modal">
                                  <i class="fa-solid fa-plus" style="color: #000000;"></i>
                                  <span>Nueva Invitacion</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                    <!--filtros de vuejs para el html -->
                    <div id="filtrosFinal" class="container-fluid bg-light p-3" style="display:none;">
                        <div class="row justify-content-start align-items-center px-2 pb-4">

                            <div class="col-md-3 col-lg-3 mb-3 mb-md-0">
                                <label class="mr-2">Buscar:</label>
                                <input type="text" class="form-control" v-model="busqueda" @input="filtrarInvitaciones" style="border-radius:5px;">
                            </div>

                            <div class="col-md-3 col-lg-3 mb-3 mb-md-0">
                                <label class="mr-2">Template:</label>
                                <select class="form-control selectFilter" v-model="filtroTemplate" @change="filtrarInvitaciones">
                                    <option value="">Todos</option>
                                    <option value="Western">Western</option>
                                    <option value="Boho">Boho</option>
                                    <option value="Romantic">Romantic</option>
                                    <option value="Chic">Chic</option>
                                </select>
                            </div>

                            <div class="col-md-3 col-lg-3 mb-3 mb-md-0">
                                <label class="mr-2">Estado:</label>
                                <select class="form-control selectFilter" v-model="filtroEstado" @change="filtrarInvitaciones">
                                    <option value="">Todos</option>
                                    <option value="pagada">Pagado</option>
                                    <option value="pendiente">Pendiente</option>
                                </select>
                            </div>

                            <div class="col-md-3 col-lg-3" style="text-align:end;">
                                <button @click="exportToCSV" class=" mt-4 btn btn-primary" style="font-size:15px;">Exportar a CSV</button>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                      <table class="table table-responsive-sm table-striped table-borderless">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Titulo</th>
                                <th>Template</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        @verbatim
                        <tbody>
                            <tr v-for="invitacion in paginatedInvitaciones" :key="invitacion.id">
                                <td>
                                    <span class="custom-checkbox">
                                        📄
                                    </span>
                                </td>
                                <td>{{ invitacion.titulo }}</td>
                                <td>{{ invitacion.template }}</td>
                                <td>{{ invitacion.status }}</td>
                                <td style="display: flex;">
                                    <a :href="'/invitacion/' + invitacion.slug" class="view">
                                        <i class="material-icons" data-toggle="tooltip" title="view">&#xe8f4;</i>
                                    </a>
                                    <a href="#editEmployeeModal" class="edit" data-toggle="modal" @click="prepararEditar(invitacion.id, invitacion.titulo, invitacion.idtemplate)">
                                        <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </a>
                                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion(invitacion.id)">
                                        <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </a>
                                    <a :href="'/panel/builder/' + invitacion.slug" class="build">
                                        <i class="material-icons" data-toggle="tooltip" title="Build">&#xE869;</i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="invitaciones.length > itemsPerPage">
                        <div class="clearfix">
                            <ul class="pagination">
                                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                    <a @click="prevPage" class="page-link">Previous</a>
                                </li>
                                <li v-for="i in totalPages" :key="i" class="page-item" :class="{ 'active': i === currentPage }">
                                    <a @click="changePage(i)" class="page-link">{{ i }}</a>
                                </li>
                                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                    <a @click="nextPage" class="page-link">Next</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div> 
            <!-- Agregar Modal HTML -->
        <div id="addEmployeeModal" class="modal fade">
          <div class="modal-dialog ">
            <div class="modal-content modalCreateInvitacion">
              <form @submit.prevent="submitForm">
                <div class="modal-body">

                  <div class="form-group">
                    <span>Titulo</span>
                    <input v-model="titulo" type="text" class="form-control">
                    <div v-if="validationErrors && validationErrors.titulo" class="error">
                    <span class="text-danger">{{ validationErrors.titulo[0]}}</span>
                    </div>
                    <div v-if="validationErrors && validationErrors.slug" class="error">
                    <span class="text-danger">{{ validationErrors.slug[0]}}</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="tag-buttons">
                    <button type="button" v-for="categoria in categorias" :key="categoria.id" class="tag-button"  @click="filtrarPorCategoria(categoria.nombre)" >
                      {{ categoria.nombre }}
                    </button>
                    </div>
                  </div>

                  <div class="">
                    <span>Template</span>
                    <!--start carousel-->
                    <div class="text-center">
                      <button type="button" @click="scrollLeft" >←</button>
                      <button type="button" @click="scrollRight" >→</button>
                    </div>
                    <div class="slider-container">

                    <div class="horizontal-carousel" ref="carouselContainer">
                        <div v-for="(image, index) in templatesFiltrados" :key="index" class="carousel-item1">
                          <img  :src="urlApp + '/storage/uploads/ImgTemplate/' + image.image" alt="Image" class="carousel-image">
                          <div class="checkmark" :class="{ selected: image.selected }" @click="toggleImage(index)"></div>
                        </div>
                        <div class=" text-center mt-5" v-if="templatesFiltrados.length === 0">
                            <p>No hay templates 🤔</p>
                        </div>
                      </div>
                    
                    </div>
                    <div v-if="textoTemplate" class="error">
                        <span class="text-danger">{{ textoTemplate}}</span>
                    </div>
                    <!--end carousel-->
                  </div>
                  <div class="text-end" style="text-align: end;">
                    <input type="submit" class="tag-button" value="Crear Invitacion">
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form @submit.prevent="EditarInvitacion">
                <div class="modal-header">						
                  <h4 class="modal-title">Editar Invitacion</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">					
                  <div class="form-group">
                    <label>Titulo</label>
                    <input type="text" name="titulo" class="form-control" v-model="invitacionEditarTitulo" required>

                    <div v-if="validationErrors && validationErrors.titulo" class="error">
                    <span class="text-danger">{{ validationErrors.titulo[0]}}</span>
                    </div>
                    <div v-if="validationErrors && validationErrors.slug" class="error">
                    <span class="text-danger">{{ validationErrors.slug[0]}}</span>
                    </div>

                  </div>
                  <div class="form-group">
                    <label>Template</label>
                    <br>
                    <select name="template" id="" v-model="invitacionEditarTemplate" style="width: 100%;">
                      <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
                    </select>
                  </div>		
                </div>
                <div class="modal-footer">
                  <input type="submit" class="btn btn-info text-dark" value="Save">
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Delete Modal HTML -->
        <div id="deleteEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form v-on:submit.prevent="eliminarInvitacion">
                <div class="modal-header">						
                  <h4 class="modal-title">Eliminar Invitacion</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">					
                  <p>¿Está seguro de que desea eliminar esta invitacion?</p>
                  <p class="text-danger"><small>Esta acción no se puede deshacer.</small></p>
                </div>
                <div class="modal-footer bg-light">
                  <input type="submit" class="btn btn-danger text-dark" value="Delete">
                </div>
              </form>
            </div>
          </div>
        </div>

        </div>
        @endverbatim
        <div id="confetti-container"></div>
    </section>

    @section('script')
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
      <script>

        function confeti(){
          var  contenedor = document.getElementById('confetti-container');

          var  jsConfetti = new JSConfetti({ contenedor });

          jsConfetti.addConfetti();
        }
      </script>
      <script src="/script/admin.js"></script>
      <script src="/script/vue.js"></script>
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          const btnFiltros = document.querySelector('.btnFiltros');
          const filtrosFinal = document.querySelector('#filtrosFinal');

          btnFiltros.addEventListener('click', function() {
              if (filtrosFinal.style.display === "none") {
                  filtrosFinal.style.display = "block";
                  btnFiltros.innerHTML = '<i class="fa-solid fa-filter"></i> Ocultar Filtros';
              } else {
                  filtrosFinal.style.display = "none";
                  btnFiltros.innerHTML = '<i class="fa-solid fa-filter"></i> Mostrar Filtros';
              }
          });
        });

      </script>
    @endsection

@endsection
