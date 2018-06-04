import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AutService {

  private _token: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {
    this._token = localStorage.getItem('token');
  }

  public isLogued() {
    try {
      //this._token = localStorage.getItem('token');
      if (this._token) {
        return tokenNotExpired('token', this._token);
      }
      else {
        console.log("Debe loguearse");
        return false;
      }
    } catch (error) {
      console.log("ERROR: NO HAY TOKEN");
      console.log(error);
      //throw error;
    }
  }

  public setToken(tok) {
    this._token = tok;
  }

  public getToken() {
    return this._token;
  }

  public getPayloadToken() {
    try {
      return this.jwtHelper.decodeToken(this._token);
    } catch (error) {
      return undefined;
    }
  }

  public getExpirationDate() {

    try {
      //console.log('getExpirationDate', this.jwtHelper.getTokenExpirationDate(this._token))
      return this.jwtHelper.getTokenExpirationDate(this._token);
    } catch (error) {
      return null;
    }
  }

  public logOut() {
    try {
      this.removeLocalStorage();
    } catch (error) {
      return false;
    }
  }

  public removeLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('usuario');
  }


  // public getNivel() {
  //   // console.log(this.jwtHelper.decodeToken(this._token));
  //   if (this.jwtHelper.decodeToken(this._token).nivel || this.jwtHelper.decodeToken(this._token).nivel === 0)
  //     return this.jwtHelper.decodeToken(this._token).nivel;
  //   else
  //     return 1000;
  // }
}
