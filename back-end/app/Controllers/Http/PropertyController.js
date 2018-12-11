'use strict' 
const Property = use('App/Models/Property')

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   */

  async index ({ request }) {
    const { numero1, numero2, filtro } = request.all()
  
    const properties = Property.query()
      .nearBy(numero1, numero2, filtro)
      .fetch()
  
    return properties
  }

  /**
   * Create/save a new property.
   * POST properties
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'descripition',
      'date',
      'category',
      'value',
      'status'
    ])
  
    const property = await Property.create({ ...data, user_id: id })
  
    return property
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   */
  async update ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)
  
    const data = request.only([
      'descripition',
      'date',
      'category',
      'value',
      'status'
    ])
  
    property.merge(data)
  
    await property.save()
  
    return property
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PropertyController
