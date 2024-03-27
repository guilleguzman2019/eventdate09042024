<?php

    $categoriasJson = $categorias->map(function ($c) {
        return [
            'id' => $c->id,
            'nombre' => $c->nombre,
        ];
    })->toJson();

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


      var data = {!! $categoriasJson !!};

      var token = '{{ csrf_token() }}';

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Categorias</h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal">
                                    <i class="material-icons">&#xE147;</i> <span>Agregar categoria</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                    

                    <table class="table table-responsive-sm table-striped">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      @verbatim
                      <tbody>
                          <tr v-for="c in paginatedCategorias" :key="c.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td>{{ c.nombre }}</td>
                              <td style="display: flex;">
                              
                                  <a href="#editEmployeeModal" class="edit" data-toggle="modal" @click="prepararEditar(c.id, c.nombre)">
                                      <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                  </a>
                                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion(c.id)">
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
                            <h4 class="modal-title">Agregar categoria</h4>
                            <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">					
                            <div class="form-group">
                                <label for="nombre">Nombre:</label>
                                <input type="text" v-model="categoria.nombre"   class="form-control" id="nombre" required>
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
              <form v-on:submit.prevent="EditarCategoria">
                <div class="modal-header">						
                  <h4 class="modal-title">Editar Invitacion</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">

                <input type="text" v-model="categoriaEditarNombre" class="form-control" id="nombre" required>
                  
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
                  <h4 class="modal-title">Eliminar Categoria</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">					
                  <p>¿Está seguro de que desea eliminar esta categoria?</p>
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
      <script src="/script/vueCategorias.js"></script>
    @endsection
@endsection
