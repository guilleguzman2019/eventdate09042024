<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanelController;

// Rutas que requieren autenticación y type = 0
Route::middleware(['auth', 'type:0'])->group(function () {

    Route::get('/', [PanelController::class, 'index'])->name('panel.index');

    //invitaciones

    Route::get('/crear', [PanelController::class, 'crear'])->name('panel.crear');
    Route::get('/invitaciones', [PanelController::class, 'invitaciones'])->name('panel.invitaciones');
    Route::get('/builder/{slug}', [PanelController::class, 'builder'])->name('panel.builder');

    //musica

    Route::get('/musica', [PanelController::class, 'musica'])->name('panel.musica');

    //confirmados

    Route::get('/confirmados', [PanelController::class, 'confirmados'])->name('panel.confirmados');

    //transporte

    Route::get('/transporte', [PanelController::class, 'transporte'])->name('panel.transporte');

    
});

Route::post('/saveData', [PanelController::class, 'saveData']);

Route::post('/PagoMercadopago', [PanelController::class, 'mercadopago']);

Route::post('/crear', [PanelController::class, 'crearInvitacion'])->name('crearinvitacion');

Route::post('/eliminarInvitacion', [PanelController::class, 'eliminarInvitacion']);

Route::post('/editarInvitacion', [PanelController::class, 'editarInvitacion']);

Route::post('/upload', [PanelController::class, 'upload']);

Route::post('/upload2', [PanelController::class, 'upload2']);

Route::post('/songs', [PanelController::class, 'songs']);

Route::post('/confirmation', [PanelController::class, 'confirmation']);

Route::post('/transport', [PanelController::class, 'transport']);


Route::post('/notificacion', [PanelController::class, 'notificacion']);

Route::get('/sucess', [PanelController::class, 'sucess']);

Route::get('/failed', [PanelController::class, 'failed']);