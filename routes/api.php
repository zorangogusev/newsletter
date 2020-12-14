<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([ 'prefix' => 'admin', 'namespace' => 'User'], function() {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

});

Route::group(['prefix' => 'admin', 'namespace' => 'User', 'middleware' => ['auth']], function(){

    Route::get('/get-all-news/{token}/{pagination?}', [NewsController::class, 'getAllNews']);
    Route::post('/add-news', [NewsController::class, 'addNews']);
    Route::get('/get-single-news/{token}/{id}', [NewsController::class, 'getSingleNews']);
    Route::post('/edit-news/{id}', [NewsController::class, 'editNews']);
    Route::post('/delete-news/{token}/{id}', [NewsController::class, 'deleteNews']);
    Route::get('/search-news/{search}/{token}/{pagination?}', [NewsController::class, 'searchNews']);

    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('/home/{pagination?}', [NewsController::class, 'homePage']);
