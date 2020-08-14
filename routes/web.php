<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/items', function () {
    return view('items.list');
});

Route::get('/list/{filename?}', 'WarframeController@index' )->name( 'warframe.index' );

Route::prefix('api')->group(function () {
    Route::post('/data', 'WarframeController@api')->name( 'warframe.api' );
    Route::get('/items/{category}', 'itemController@show')->name('api.items.show');
});
