import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-felicitacion',
  templateUrl: './felicitacion.page.html',
  styleUrls: ['./felicitacion.page.scss'],
})
export class FelicitacionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAlLogin() {
    this.router.navigateByUrl('login');
  }

}
