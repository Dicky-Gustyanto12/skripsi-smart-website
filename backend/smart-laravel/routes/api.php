<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoktanController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PengajuanController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('poktan', PoktanController::class);
Route::apiResource('pengajuan', PengajuanController::class);
Route::apiResource('kriteria', KriteriaController::class);