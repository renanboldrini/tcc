'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')

  Route.resource('billsToPay', 'BillsToPayController')
  .apiOnly()
  .middleware('auth')

  Route.resource('billsToReceive', 'BillsToReceiveController')
  .apiOnly()
  .middleware('auth')

  Route.resource('budget', 'BudgetController')
  .apiOnly()
  .middleware('auth')

  Route.resource('balance', 'BalanceController')
  .apiOnly()
  .middleware('auth')