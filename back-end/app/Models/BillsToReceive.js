'use strict'

const Model = use('Model')

class BillsToReceive extends Model {

    user () {
        return this.belongsTo('App/Models/User')
      }
      
}

module.exports = BillsToReceive
