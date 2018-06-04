import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { WsService }  from './services/ws/ws.service';
import { AutService } from './services/auth/aut.service';
import { VerificarJWTService } from './services/verificar-jwt/verificar-jwt.service';
import { JwtModule } from './jwt/jwt.module';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
//import { SolicitudRemisComponent } from './componentes/solicitud-remis/solicitud-remis.component';
import { ListadoViajesComponent } from './components/listado-viajes/listado-viajes.component';
import { SolicitudRemisComponent } from './components/solicitud-remis/solicitud-remis.component';
import { InformesComponent } from './components/informes/informes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ClientesComponent } from './components/clientes/clientes.component';


const appRoutes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudRemisComponent,
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'listadoviajes', 
    component: ListadoViajesComponent, 
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'informes', 
    component: InformesComponent, 
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'vehiculos', 
    component: VehiculosComponent, 
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'choferes', 
    component: EmpleadosComponent, 
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'clientes', 
    component: ClientesComponent, 
    canActivate: [VerificarJWTService]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '',   
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    component: ErrorComponent 
  }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    Pagina1Component,
    Pagina2Component,
    ErrorComponent,
    LoginComponent,
    SolicitudRemisComponent,
    ListadoViajesComponent,
    InformesComponent,
    VehiculosComponent,
    EmpleadosComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JwtModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WsService,
    AutService,
    VerificarJWTService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



