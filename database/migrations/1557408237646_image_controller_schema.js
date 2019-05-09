'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageControllerSchema extends Schema {
  up () {
    this.create('image_controllers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('image_controllers')
  }
}

module.exports = ImageControllerSchema
