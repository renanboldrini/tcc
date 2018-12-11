'use strict'

const Model = use('Model')

const Database = use('Database')

class Property extends Model {

    static scopeNearBy (query, numero1, numero2, filtro) {
        const haversine = `(1 * ${numero1}+${numero2}+value)`
    
        return query
          .select('*', Database.raw(`${haversine} as result`))
          .whereRaw(`${haversine} < ${filtro}`)
    }

    user () {
        return this.belongsTo('App/Models/User')
      }
}

module.exports = Property
