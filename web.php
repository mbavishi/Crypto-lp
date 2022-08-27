<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It is a breeze. Simply tell Lumen the URIs it should respond to
  | and give it the Closure to call when that URI is requested.
  |
 */

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group(['prefix' => '','middleware' => 'lang'], function () use ($router) {

    $router->post('adminlogin', 'ManageApiController@authenticate');  
    $router->post('sendotp', 'ManageApiController@adminSendOtp');
    $router->post('pass_update', 'ManageApiController@changeForgotPassword');
    $router->post('user_wallet_conn', 'ManageApiController@getUserwallteData');
    $router->post('get_currency_data', 'ManageApiController@getCurrencyDatatable');
    $router->post('add_currency_data', 'ManageApiController@addCurrencyData');
    $router->post('edit_currency_data/{curr_id}', 'ManageApiController@updateCurrencyData');
    $router->post('delete_currency_data/{curr_id}', 'ManageApiController@deleteCurrencyData');
    $router->post('change_currency_status/{curr_id}', 'ManageApiController@changeCurrencyStatus');
    $router->post('add_currency_pair', 'ManageApiController@addCurrencyPairData');
    $router->post('edit_currency_pair/{curr_pair_id}', 'ManageApiController@updateCurrencyPairData');
    $router->post('delete_currency_pair/{curr_pair_id}', 'ManageApiController@deleteCurrencyPairData');
    $router->post('change_curr_pair_status/{curr_pair_id}', 'ManageApiController@changeCurrencyPairStatus');
    $router->post('get_transaction_data', 'ManageApiController@setTransactionDatatable');
    $router->post('add_transaction', 'ManageApiController@addTransactionData');
    $router->get('all_from_currency', 'ManageApiController@getAllFromCurrency');
    $router->get('all_to_currency/{from_curr_id}', 'ManageApiController@getToCurrency');
    $router->get('get_settings', 'ManageApiController@getConfigTableData');
    $router->post('update_settings_data', 'ManageApiController@checkMaintenance');
    $router->post('transaction_data/{reveived_status}', 'ManageApiController@getAllTransactionByStatus');
    $router->post('update_profile/{admin_id}', 'ManageApiController@updateProfileData');
    $router->post('change_pass/{admin_id}', 'ManageApiController@changePassword');
    $router->post('user_deposit/{user_id}', 'ManageApiController@userTransactionData');
    $router->get('all_currency', 'ManageApiController@getCurrencyData');
    $router->post('wallet_add', 'ManageApiController@getWalletAddress');
    $router->post('get_user_data', 'ManageApiController@getMemberData');
    $router->get('vide_mem_data/{user_id}', 'ManageApiController@viewMemberDetails');


});



