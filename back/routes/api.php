<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        $request->merge(['rule'=>$request->user()->rule]);
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
    Route::apiResource('/tasks',TaskController::class);
    Route::post('/tasks/saveOrder',[TaskController::class,'saveOrder']);
});
/*
 *  AuthController
 */
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
