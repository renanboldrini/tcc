'use strict'

const Model = use('Model')

class Budget extends Model {

    user () {
        return this.belongsTo('App/Models/User')
      }

      user () {
        return this.hasOne('App/Models/Budget')
      } 
      
}

module.exports = Budget
