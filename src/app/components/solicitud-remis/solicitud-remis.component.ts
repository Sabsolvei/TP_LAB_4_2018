import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws/ws.service';

@Component({
  selector: 'app-solicitud-remis',
  templateUrl: './solicitud-remis.component.html',
  styleUrls: ['./solicitud-remis.component.css']
})
export class SolicitudRemisComponent implements OnInit {

  constructor(private ws: WsService) {
    this.ws.getJwt('http://localhost:8080/LaboIV-Auth-master/servidor/jwt/pagina1', {})
      .subscribe(data => {
        console.log(data);
      });
  }
  ngOnInit() {
  }

}
