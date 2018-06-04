<?php
//require_once 'usuario.php';
// require_once 'archivo.php';
use \Firebase\JWT\JWT;

class paginaUno
{
    private static $key = "claveSecreta@";
    private static $tipoEncriptacion = ['HS256'];
    public function returnPayload($request, $response, $args) 
    {
      $headers = apache_request_headers();
      $tk = explode(' ', $headers['Authorization']);
      
      try {
        $decoded = JWT::decode($tk[1], self::$key, self::$tipoEncriptacion);

      } catch (\Firebase\JWT\ExpiredException $e) {
        print_r($e);
      }

      if ($decoded) {
        $rta['rta'] = $decoded;
      }
      else {
        $rta['rta'] = false;
      }
      
      print_r(json_encode($rta));
      return;

      // $jwt = JWT::encode($token, $key);
      // $tok['token'] = $jwt;
      // print_r(json_encode($tok));
      // return;
    }
}

?>
