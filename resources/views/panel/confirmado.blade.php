<?php
    $cancionesJson = $confirmados->map(function ($confirmado) {
        return [
            'id' => $confirmado->id,
            'nombre' => $confirmado->nombre_completo,
            'dato'   => $confirmado ->dato_importante,
            'asiste'   => $confirmado ->asiste,
            'Invitacion'   => $confirmado ->invitacion -> titulo,
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

      var data = {!! $cancionesJson !!};

      console.log(data);
    </script>
    
    <section class="">
        <div id="app">
            <div class="container p-0">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Confirmados</h2>
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
                    <!--filtros de vuejs para el html -->
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
                              <th>Dato Importante</th>
                              <th>Asiste</th>
                              <th>Invitacion</th>
                              <th>Accion</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="confirmado in confirmados" :key="confirmado.id">
                              <td>
                                  <span class="custom-checkbox">
                                      📄
                                  </span>
                              </td>
                              <td>{{ confirmado.nombre }}</td>
                              <td>{{ confirmado.dato }}</td>
                              <td>{{ confirmado.asiste }}</td>
                              <td>{{ confirmado.Invitacion }}</td>
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
      
      <script src="/script/admin.js"></script>
      <script src="/script/vueConfirmados.js"></script>
    @endsection

@endsection
