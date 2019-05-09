'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
  //informando que o imóvel sempre pertence a um usuário ou seja 1 X 1
  user () {
    return this.belongsTo('App/Models/User')
  }

  //o relacionamento que um imóvel possui muitas imagens 1 X N
  images () {
    return this.hasMany('App/Models/Image')
  }
}

module.exports = Property
