'use strict'

const Model = use('Model')

class Balance extends Model {

    user () {
        return this.belongsTo('App/Models/User')
      }
      
      user () {
        return this.hasOne('App/Models/Balance')
      } 
      
}

module.exports = Balance
