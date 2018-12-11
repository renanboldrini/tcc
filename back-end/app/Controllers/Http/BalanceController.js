'use strict'
const Balance = use('App/Models/Balance')

/**
 * Resourceful controller for interacting with balances
 */
class BalanceController {
  /**
   * Show a list of all balances.
   * GET balances
   */
  async index () {
    const balance = Balance.all()
  
    return balance
  }

  /**
   * Create/save a new balance.
   * POST balances
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'value',
      'status'
    ])
  
    const balance = await Balance.create({ ...data, user_id: id })
  
    return balance
  }

  /**
   * Display a single balance.
   * GET balances/:id
   */
  async show ({ params }) {
    const balance = await Balance.findOrFail(params.id)
  
    return balance
  }

  /**
   * Update balance details.
   * PUT or PATCH balances/:id
   */
  async update ({ params, request, response }) {
    const balance = await Balance.findOrFail(params.id)

    const data = request.only([
      'value',
      'status'
    ])
  
    balance.merge(data)
  
    await balance.save()
  
    return balance
  }

  /**
   * Delete a balance with id.
   * DELETE balances/:id
   */
  async destroy ({ params, auth, response }) {
    const balance = await Balance.findOrFail(params.id)
  
    if (balance.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await balance.delete()
  }

}

module.exports = BalanceController
