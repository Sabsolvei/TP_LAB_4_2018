<?php
require_once './vendor/autoload.php';
use Firebase\JWT\JWT;

class AutentificadorJWT
{
    private static $claveSecreta = 'ClaveSuperSecreta@';
    private static $tipoEncriptacion = ['HS256'];
    private static $aud = null;
    
    public static function CrearToken($datos)
    {
        $ahora = time();
        /*
         parametros del payload
         https://tools.ietf.org/html/rfc7519#section-4.1
         + los que quieras ej="'app'=> "API REST CD 2017" 
        */
        $payload = array(
        	'iat'=>$ahora,
           // 'exp' => $ahora + (2 * 60 * 60 * 24),
           'exp' => $ahora + (60),
            'aud' => self::Aud(),
            'data' => $datos,
            //"passthrough" => ["/api/token", "/admin/ping"], //todo lo que arranca con /api o /admin sera autenticado, excepto /api/token" y "/admin/ping
            'app'=> "API REST CD 2017"
        );
     
        return JWT::encode($payload, self::$claveSecreta, 'HS256');
    }


    
    public static function VerificarToken($token)
    {
        if(empty($token)|| $token=="")
        {
            throw new Exception("El token esta vacio.");
        }      
        try {
            $decodificado = JWT::decode(
            $token,
            self::$claveSecreta,
            self::$tipoEncriptacion
            );
        } 
        catch (ExpiredException $e)
        {
           throw new Exception("Clave fuera de tiempo");
        } 
        
        catch (Exception $e)
        {
           throw new Exception("Token no valido: ".$e->getMessage());
        }
        
        if($decodificado->aud !== self::Aud())
        {
            throw new Exception("No es el usuario valido");
        }
    }   



    public static function ObtenerPayLoad($token)
    {
        return JWT::decode(
            $token,
            self::$claveSecreta,
            self::$tipoEncriptacion
        );
    }



    public static function ObtenerData($token)
    {
        return JWT::decode(
            $token,
            self::$claveSecreta,
            self::$tipoEncriptacion
        )->data;
    }
    


    private static function Aud()
    {
        $aud = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
        
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        
        return sha1($aud);
    }
}
