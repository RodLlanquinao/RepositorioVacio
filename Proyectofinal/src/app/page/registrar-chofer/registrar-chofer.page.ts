import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-chofer',
  templateUrl: './registrar-chofer.page.html',
  styleUrls: ['./registrar-chofer.page.scss'],
})
export class RegistrarChoferPage {
  nombre=""
  apellido=""
  fechaNacimiento=""
  telefono=""
  email=""
  password=""

  constructor(private navCtrl: NavController,private firebase: FirebaseService, private router: Router) {}

  async registrarChofer() {
    try {
      const usuario = await this.firebase.registrarChofer(this.email, this.password, this.nombre, this.apellido);

      console.log(usuario);
      this.router.navigateByUrl('/felicitacion');
    } catch (error) {
      console.error('Error registrando chofer:', error);
    }
  }

  atras() {
    console.log
    this.router.navigateByUrl('/login');
  }
}

