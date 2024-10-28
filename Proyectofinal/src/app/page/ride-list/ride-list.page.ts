import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.page.html',
  styleUrls: ['./ride-list.page.scss'],
})
export class RideListPage implements OnInit {
  rides = [
    { destination: 'Casa Central', cost: 1500 },
    { destination: 'Plaza Ñuñoa', cost: 2000 },
    { destination: 'Mall Plaza', cost: 1800 },
  ];
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCreateRide() {
    this.router.navigateByUrl('/create-ride');
  }

  goToRideList() {
    this.router.navigateByUrl('/ride-list');
  }

  goToProfile(){
    this.router.navigateByUrl('/profile')
  }

  goToHome(){
    this.router.navigateByUrl('/home')
  }

}
