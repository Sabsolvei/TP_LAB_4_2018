<?php
//require_once 'usuario.php';
// require_once 'archivo.php';

class loginApi
{
    public function login($request, $response, $args) 
    {
        $token="";
        $ArrayDeParametros = $request->getParsedBody();
        $objDelaRespuesta= new stdclass();
        $usuario=$ArrayDeParametros['email'];
        $clave= $ArrayDeParametros['clave'];
        
        if(isset($usuario) && isset($clave) && $usuario !="" && $clave !="")
        {
            $data = new stdClass();
            $data->usuario = $usuario;
            $data->perfil = "admin";

            // $rtaEsValido = usuario::esValido($usuario,$clave);
            //$usuario= $rtaEsValido->usuario;
            //$objDelaRespuesta->perfil = $usuario->perfil;
            $objDelaRespuesta->token = AutentificadorJWT::CrearToken($data);
            //$objDelaRespuesta->mensaje = $rtaEsValido->msj;
            //$objDelaRespuesta->status = 200;
            // $usuario->InsertarLoginDeUsuario(date("Y/m/d H:i:s"));
            return $response->withJson($objDelaRespuesta);
            // }
            // else
            // {
            //     $objDelaRespuesta->acceso = $rtaEsValido->msj;
            //     $objDelaRespuesta->status = 409;
            //     return $response->withJson($objDelaRespuesta);
            // }
        }
        else
        {
            $objDelaRespuesta->error = "Debe completar los campos email y clave";
            return $response->withJson($objDelaRespuesta, 409);
        }
    } 
}