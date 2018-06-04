import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws/ws.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(private ws: WsService) {
    this.ws.getJwt('http://localhost:8080/LaboIV-Auth-master/servidor/jwt/pagina1', {})
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
