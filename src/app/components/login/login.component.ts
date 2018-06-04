import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WsService } from '../../services/ws/ws.service';
import { AutService } from '../../services/auth/aut.service';
// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

export class User {
  public email: string = '';
  public clave: string = '';

  constructor(email: string, clave: string) {
    this.email = email;
    this.clave = clave;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // public form:FormGroup;
  // public email:AbstractControl;
  // public password:AbstractControl;
  // public submitted:boolean = false;
  user: User = new User('', '');
  url: string = 'http://localhost:8080/servidor/jwt/';

  constructor(private router: Router, private ws: WsService, private autService: AutService) {
    this.user.email = '';
    // console.log(this.user);
  }

  ngOnInit() {
  }
  enviar() {
    console.log(this.user);
    this.ws.get(this.user)
      .subscribe(data => {
        if (data.token) {
          this.setLoginData(data);
          this.router.navigateByUrl("/listadoviajes");
        }
      });
  }

  setLoginData(data) {
    this.autService.setToken(data.token);
    let payloadToken = this.autService.getPayloadToken();
    localStorage.setItem('token', data.token);
    localStorage.setItem('perfil', payloadToken['data'].perfil);
    localStorage.setItem('usuario', payloadToken['data'].usuario);
  }
}
