'use strict'
const Budget = use('App/Models/Budget')

/**
 * Resourceful controller for interacting with budgets
 */
class BudgetController {
  /**
   * Show a list of all budgets.
   * GET budgets
   */
  async index () {
    const budget = Budget.all()
  
    return budget
  }

  /**
   * Create/save a new budget.
   * POST budgets
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'value',
      'status'
    ])
  
    const budget = await Budget.create({ ...data, user_id: id })
  
    return budget
  }

  /**
   * Display a single budget.
   * GET budgets/:id
   */
  async show ({ params }) {
    const budget = await Budget.findOrFail(params.id)
  
    return budget
  }

  /**
   * Update budget details.
   * PUT or PATCH budgets/:id
   */
  async update ({ params, request, response }) {
    const budget = await Budget.findOrFail(params.id)

    const data = request.only([
      'value',
      'status'
    ])
  
    budget.merge(data)
  
    await budget.save()
  
    return budget
  }

  /**
   * Delete a budget with id.
   * DELETE budgets/:id
   */
  async destroy ({ params, auth, response }) {
    const budget = await Budget.findOrFail(params.id)
  
    if (budget.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await budget.delete()
  }
  
}

module.exports = BudgetController
