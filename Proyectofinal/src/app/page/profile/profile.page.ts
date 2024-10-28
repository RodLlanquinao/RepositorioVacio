import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  email: Observable<string | null>;


  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    this.email = this.afAuth.user.pipe(
      map(user => user?.email || 'No email available')
    );
  }

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
