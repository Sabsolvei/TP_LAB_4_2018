import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws/ws.service';

@Component({
  selector: 'app-listado-viajes',
  templateUrl: './listado-viajes.component.html',
  styleUrls: ['./listado-viajes.component.css']
})
export class ListadoViajesComponent implements OnInit {

  constructor(private ws: WsService) {
    this.ws.getJwt('http://localhost:8080/LaboIV-Auth-master/servidor/jwt/pagina1', {})
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
