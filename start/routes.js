'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return JSON.stringify('Hello world in JSON' );
})
//rota para criar um novo usuario
Route.post('/users', 'UserController.create');
//rota para pegar o token de session
Route.post('/sessions', 'SessionController.create');


//este comando do adonis gera todas estas e o auth para que tenha que ser autheticado
/**
index: Listar todos registros;
show: Exibir um registro;
store: Criar novo registro;
update: Alterar um registro;
destroy: Remover um registro;
 */

 //apiOnly() garante as rotas create e edit que deletamos anteriormente não tenham rota
Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')
