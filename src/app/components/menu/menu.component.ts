import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutService } from '../../services/auth/aut.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private autService: AutService) { }

  ngOnInit() {
  }
  salir()
  {
    this.autService.logOut();
    this.router.navigate(['/login']);
  }
}
