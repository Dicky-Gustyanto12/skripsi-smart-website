<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PoktanController;

// ✅ Route default
Route::get('/', function () {
    return view('welcome');
});

// ✅ Tambahkan ini untuk Laravel Sanctum
Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->noContent();
});
