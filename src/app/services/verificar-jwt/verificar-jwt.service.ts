import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AutService } from '../auth/aut.service';

@Injectable()
export class VerificarJWTService implements CanActivate {

  constructor(private router: Router, private autService: AutService) {
    //console.log('isLogued()', autService.isLogued());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    let url: string = state.url;

    if (this.autService.isLogued()) {
      let payloadToken = this.autService.getPayloadToken();
      let perfil = payloadToken['data'].perfil;
      let permisoDeAcceso = false;

      switch (perfil) {
        case 'admin': //pasar a encargado
          if (url)
            permisoDeAcceso = true;
          break;
        case 'chofer':
          if (url === '/listadoviajes')
            permisoDeAcceso = true;
          break;
        case 'cliente':
          if (url === '/listadoviajes' || url === '/solicitud')
            permisoDeAcceso = true;
          break;
      }

      if (permisoDeAcceso) {
        return true;
      }
      else {
        console.log("No tiene permisos de acceso.");
        this.router.navigate(['/error']);
        return false;
      }
    }

    else {
      console.log("Debe loguearse");
      this.router.navigate(['/error']);
      // this.router.navigate(['/pages/forms/inputs']);
      return !true;
    }
  }
}
