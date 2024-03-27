<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;

Route::middleware(['auth', 'type:1'])->group(function () {

    //componentes

    Route::get('/componentes', [AdminController::class, 'componentes'])->name('admin.componentes');
    Route::get('/component/edit/{id}', [AdminController::class, 'EditComponent'])->name('admin.editComponent');
    Route::get('/builder/{id}', [AdminController::class, 'builder'])->name('admin.builder');
    Route::post('/updateComponent', [AdminController::class, 'updateComponent']);

    //templates

    Route::get('/templates', [AdminController::class, 'templates'])->name('admin.templates');
    Route::post('/crearTemplate', [AdminController::class, 'crearTemplate']);
    Route::post('/upload', [AdminController::class, 'upload'])->name('upload');
    Route::post('/editarTemplate', [AdminController::class, 'upload'])->name('upload');
    Route::post('/deleteTemplate', [AdminController::class, 'deleteTemplate'])->name('upload');

    //categorias

    Route::get('/categorias', [AdminController::class, 'categorias'])->name('admin.categorias');
    Route::post('/crearCategoria', [AdminController::class, 'crearCategoria']);
    Route::post('/editarCategoria', [AdminController::class, 'editarCategoria']);
    Route::post('/eliminarCategoria', [AdminController::class, 'eliminarCategoria']);


    Route::post('/upload', [AdminController::class, 'upload2']);
    
});