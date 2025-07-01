?php

require_once __DIR__ . '/../vendor/autoload.php';

use src\Controllers\UsuarioController;
use src\models\entity\Usuario;
use src\Routes\Routes;

$route = new Routes();

// rota é apenas o Back-End com API
// Rota Usuario
$route->add('POST', '/api/usuario', [new UsuarioController, 'criar']);
$route->add('DELETE', '/api/usuario/{id}', [new UsuarioController, 'remover']);
$route->add('PUT', '/api/usuario/{id}', [new UsuarioController, 'atualizar']);
$route->add('GET', '/api/usuario/{id}', [new UsuarioController, 'consultar']);
$route->add('GET', '/api/usuarios', [new UsuarioController, 'listar']);

$route->add('GET', '/hello', [new UsuarioController, 'hello']);
$route->add('GET', '/hello', [new LivroController, 'hello']);

// rota tem o Front-End em PHP com Back-End em PHP
$route->add('GET', '/usuario/cadastro', [new UsuarioController, 'mostrarFormulario']);

$route->handleRequest();