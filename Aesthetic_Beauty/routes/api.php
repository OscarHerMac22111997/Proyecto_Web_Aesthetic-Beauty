<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\StylesController;
use App\Http\Controllers\ShopsController;
use App\Http\Controllers\StylistsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ColorsController;
use App\Http\Controllers\DatesController;
use Illuminate\Support\Facades\Auth; 
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [App\Http\Controllers\API\AuthController::class, 'register'])->name('register');
Route::post('registerStylist', [StylistsController::class, 'register'])->name('register');
Route::post('login', [App\Http\Controllers\API\AuthController::class, 'login'])->name('login');
Route::get('getAllStyles',[StylesController::class, 'getAll']);
Route::get('getAllColors',[ColorsController::class, 'getAll']);
Route::get('getNextUserDate/{id}',[DatesController::class, 'getNextUserDate']);
Route::get('getNextClient/{id}',[DatesController::class, 'getNextClient']);
Route::get('getTodayDates/{id}',[DatesController::class, 'getTodayDates']);
Route::get('getRates/{id}',[DatesController::class, 'getRates']);
Route::get('getClientDates/{id}',[DatesController::class, 'getClientDates']);
Route::get('getMydates/{id}',[DatesController::class, 'mydates']);
Route::post('getAvailable/',[DatesController::class, 'getAvailable']);
Route::post('getAvailableStylist/',[DatesController::class, 'getAvailableStylist']);
Route::get('getAvailableServices/{id}',[DatesController::class, 'getAvailableServices']);
Route::get('getStatics',[StylistsController::class, 'getStatics']);
Route::get('getCurrentUser/{email}',[AuthController::class, 'getCurrentUser']);
Route::get('cuser', function () {
    $user=Auth::user();
    return response(['user_id'=>$user->name],200);
});

Route::resource('services',ServicesController::class);
Route::resource('styles',StylesController::class);
Route::resource('shops',ShopsController::class);
Route::resource('colors',ColorsController::class);
Route::resource('users',AuthController::class);
Route::resource('dates',DatesController::class);
Route::resource('stylists',StylistsController::class);
Route::get('getAllStylists',[StylistsController::class,'getAll']);