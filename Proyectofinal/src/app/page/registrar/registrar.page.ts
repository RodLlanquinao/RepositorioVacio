import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  nombre=""
  apellido=""
  fechaNacimiento=""
  telefono=""
  email=""
  password=""
  constructor(private navCtrl: NavController, private firebase:FirebaseService,private router:Router) { }

  ngOnInit() {
  }
  
  async registrar(){ 
    try {
      const usuario = await this.firebase.registrar(this.email, this.password);

      console.log(usuario);
      // Navega a la página de felicitaciones
      this.router.navigateByUrl('/felicitacion'); 
    } catch (error) {
      console.error('Error durante el registro:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  } 

  login() {
    this.router.navigateByUrl('/login'); 
  }
}
