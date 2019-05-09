'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Image = use('App/Models/Image')
const Property = use('App/Models/Property')

//classe Helpers do Adonis que vai nos dar acesso ao caminho da pasta de uploads chamada tmp.
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ params, request }) {

    const property = await Property.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return images.errors()
    }

    //percorrendo todas imagens salvas e cadastrando dentro do imóvel, isso só é possível pois dentro do nosso model de imóvel temos um método images() que é o relacionamento de imóvel com imagens.
    await Promise.all(
      images
        .movedList()
        .map(image => property.images().create({ path: image.fileName }))
    )

  }
}

module.exports = ImageController
