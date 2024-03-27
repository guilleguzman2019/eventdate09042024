<?php
    $componentesJson = $componentes->map(function ($component) {
        return [
            'id' => $component->id,
            'nombre' => $component->nombre,
            'template' => $component->template->name,
            'html' => $component -> html ,
            'css' => $component -> style
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

      var data = {!! $componentesJson !!};

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Componentes</h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal">
                                    <i class="material-icons">&#xE147;</i> <span>Agregar Componente</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                        
                    <div class="px-2 pb-4" style="display:flex; justify-content: flex-end; align-items: center;">
                        <div style="margin-right: 29px;">
                            <label style=" margin-right: 11px;">Template:</label>
                            <select class="selectFilter" v-model="filtroTemplate" @change="filtrarInvitaciones" style=" width: 150px;">
                                <option value="">Todos</option>
                                <option value="Western">Western</option>
                                <option value="Boho">Boho</option>
                                <option value="Romantic">Romantic</option>
                                <option value="Chic">Chic</option>
                                <option value="Diva">Diva</option>
                                <option value="Plata">Plata</option>
                                <option value="Blue">Blue</option>
                                <option value="Funeraria4">Funeraria4</option>
                                <option value="ServicioTecnico">ServicioTecnico</option>
                                <option value="HarryPotter">Harry Potter</option>
                            </select>
                        </div>
                    </div>

                    <table class="table table-responsive-sm table-striped">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Titulo</th>
                              <th>Template</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      @verbatim
                      <tbody>
                          <tr v-for="componente in paginatedInvitaciones" :key="componentes.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td>{{ componente.nombre }}</td>
                              <td>{{ componente.template }}</td>
                              <td style="display: flex;">
                                  <a :href="'/admin/component/edit/' + componente.id" target="_blank" class="edit"  @click="prepararEditar(componente.id, componente.html, componente.css)">
                                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                  </a>
                                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion()">
                                      <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                  </a>
                                  <a :href="'/admin/builder/' + componente.id" class="build">
                                      <i class="material-icons" data-toggle="tooltip" title="Build">&#xE869;</i>
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
            @endverbatim

             <!-- Agregar Modal HTML -->
        <div id="addEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form @submit.prevent="submitForm">
                <div class="modal-header">			
                  <h4 class="modal-title">Agregar Invitacion</h4>
                  <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">					
                  	
                </div>
                <div class="modal-footer">
                  <input type="submit" class="btn btn-success" value="Agregar">
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <form>
                <div class="modal-header">						
                  <h4 class="modal-title">Editar Invitacion</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                
                <textarea id="code" v-model="htmlComponente"></textarea>
                  
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
    </section>
    @section('script')
      
      <script src="/script/admin.js"></script>
      <script src="/script/vue2.js"></script>
      <script src="/script/mirror.js"></script>
    @endsection
@endsection
