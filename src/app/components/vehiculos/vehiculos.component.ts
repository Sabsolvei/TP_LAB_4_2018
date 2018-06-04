import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws/ws.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(private ws: WsService) {
    this.ws.getJwt('http://localhost:8080/LaboIV-Auth-master/servidor/jwt/pagina1', {})
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
