<?php
    $templatesJson = $templates->map(function ($template) {
        return [
            'id' => $template->id,
            'nombre' => $template->name,
            'imagen' => $template->image,
            'categoria' => $template -> category -> nombre ,
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
    @include('includes.navbarAdmin')
@endsection

@section('content')
    @include('layouts.navigation')
    <br>

    <script>

      var data = {!! $templatesJson !!};

      var data2 = {!! $categoriasJson !!};

      var token = '{{ csrf_token() }}';

      var urlApp = '{!! $appUrl !!}';

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Templates</h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal">
                                    <span>Agregar template</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                        

                    <table class="table table-responsive-sm table-striped">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Imagen</th>
                              <th>Nombre</th>
                              <th>Categoria</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      @verbatim
                      <tbody>
                          <tr v-for="t in templates" :key="t.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td><img :src="urlApp + '/storage/uploads/ImgTemplate/' + t.imagen" alt="" width="50"></td>
                              <td>{{ t.nombre }}</td>
                              <td>{{ t.categoria }}</td>
                              <td style="display: flex;">

                                  <a href="#editEmployeeModal" class="edit" data-toggle="modal" @click="prepararEditar(t.id,t.nombre, t.categoria, t.imagen)">
                                      <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                  </a>
                                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion(t.id)">
                                      <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                  </a>
                              </td>
                          </tr>
                      </tbody>
                    </table>
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

        <!-- Agregar Modal HTML -->
        <div id="addEmployeeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="submitForm">
                        <div class="modal-header">			
                            <h4 class="modal-title">Agregar Template</h4>
                            <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">					
                            <div class="form-group">
                                <label for="nombre">Nombre:</label>
                                <input type="text" v-model="template.nombre"  class="form-control" id="nombre" required>
                            </div>

                            <div class="form-group">
                                <label for="categoria">Categoría:</label>
                                <select v-model="template.categoria_id" class="form-control" id="categoria" required>
                                    <option value="" disabled selected>Selecciona una categoría</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nombre }}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="imagen">Seleccionar Imagen:</label>
                                <div  @click="selectImage" style="width: 60%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative;">
                                    <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                                    <input ref="fileInputTemplate" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage">
                                    <img v-if="imagePreview" :src="imagePreview" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success text-dark">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <form v-on:submit.prevent="EditarTemplate">
                <div class="modal-header">						
                  <h4 class="modal-title">Editar Invitacion</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                
                <input type="text" v-model="templateEditaNombre"  class="form-control" id="nombre" required>

                <div class="form-group">
                    <label for="categoria">Categoría:</label>
                    <select class="form-control" id="categoria" v-model="templateEditaCategoria" required>
                        <option value="" disabled selected>Selecciona una categoría</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nombre }}</option>
                    </select>
                </div>

                 <div class="form-group">
                        <label for="imagen">Seleccionar Imagen:</label>
                        <input type="file" @change="handleFileChange" class="form-control-file" id="imagen" accept="image/*" >
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
              <form v-on:submit.prevent="eliminarTemplate">
                <div class="modal-header">						
                  <h4 class="modal-title">Eliminar template</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">					
                  <p>¿Está seguro de que desea eliminar este template?</p>
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
    </section>
    @endverbatim
    @section('script')
      
      <script src="/script/admin.js"></script>
      <script src="/script/vueTemplate.js"></script>
    @endsection
@endsection
