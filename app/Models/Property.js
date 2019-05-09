'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Database = use('Database');

class Property extends Model {

  //conceito de Query Scopes do Adonis que permite criarmos nossos próprios métodos no construtor de queries
  static scopeNearBy (query, latitude, longitude, distance) {
    //calculo naval de distancia
    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

  return query
    .select('*', Database.raw(`${haversine} as distance`))
    .whereRaw(`${haversine} < ${distance}`)
  }

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
