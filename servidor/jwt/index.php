<?php

require 'vendor/autoload.php';
require_once 'loginApi.php';
require_once 'pagina1.php';
require_once 'AutentificarJWT.php';
//require_once './clases/AccesoDatos.php';
//use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Slim\Http\Response as Response;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


header('Access-Control-Allow-Origin: *'); //'http://localhost:4200'
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, mimeType, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Allow: GET, POST, PUT, DELETE");
// $method = $_SERVER['REQUEST_METHOD'];
// if($method == "OPTIONS") {
//     die();
// }

$app->get('/hello/{name}', function ($request, $response, $args) {
    
    return $response->getBody()->write("Hello, " . $args['name']);
});

$app->post('/login', \loginApi::class . ':login');//->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->get('/pagina1', \paginaUno::class . ':returnPayload');//->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->run();

