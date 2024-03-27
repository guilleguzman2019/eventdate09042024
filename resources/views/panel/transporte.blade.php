<?php
    $transporteJson = $transporte->map(function ($t) {
        return [
            'id' => $t->id,
            'nombre' => $t->nombre,
            'cantidad'   => $t ->numero_personas,
            'Invitacion'   => $t ->invitacion -> titulo,
        ];
    })->toJson();

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

      var data = {!! $transporteJson !!};

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container p-0">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Transporte</h2>
                            </div>
                            <!--
                            <div class="col-sm-6">
                                <a  class="btnFiltros btn btn-claro">
                                  <i class="fa-solid fa-filter"></i>
                                </a>
                                <a href="#addEmployeeModal" class="btn btn-claro" data-toggle="modal">
                                    <span>Nuevo</span>
                                </a>						
                            </div>
                            -->
                        </div>
                    </div>
                    @verbatim
                    <div class="px-2 pb-4" style="display:flex; justify-content: flex-end; align-items: center;">
                       

                       <div style="margin-right: 29px;">
                        <label style=" margin-right: 11px;">Invitacion:</label>
                        <select class="selectFilter" v-model="filtroTemplate" @change="filtrarInvitaciones" style=" width: 150px;">
                            <option value="">Todos</option>
                            <option v-for="invitacion in invitacionesUnicas" :key="invitacion" :value="invitacion">{{ invitacion }}</option>
                        </select>
                       </div>

                       <div style=" margin-left: 25px;">
                        <button @click="exportToCSV" class="btn btn-primary">Exportar a CSV</button>
                       </div>

                    </div>
                    
                    <table class="table table-responsive-sm table-striped">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Cantidad</th>
                              <th>Invitacion</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="t in transporte" :key="t.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td>{{ t.nombre }}</td>
                              <td>{{ t.cantidad }}</td>
                              <td>{{ t.Invitacion }}</td>
                              <td style="display: flex;">
                                  <a href="#editEmployeeModal" class="edit" data-toggle="modal" @click="prepararEditar()">
                                      <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                  </a>
                                  <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" @click="prepararEliminacion()">
                                      <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                  </a>
                              </td>
                          </tr>
                        @endverbatim
                      </tbody>
                    </table>
                    
                </div>
            </div>

            

        </div>
    </section>

    @section('script')
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
      <script src="/script/admin.js"></script>
      <script src="/script/vueTransporte.js"></script>
    @endsection

@endsection
