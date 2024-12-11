import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-chofer',
  templateUrl: './login-chofer.page.html',
  styleUrls: ['./login-chofer.page.scss'],
})
export class LoginChoferPage implements OnInit {

  message= ""
  email=""
  password=""

  constructor(private firebase:FirebaseService, private router:Router, private alertcontroller:AlertController, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async login() {
    try {
      const userCredential = await this.firebase.auth(this.email, this.password);
      if (userCredential) {
        // Redirigir al menú del chofer
        this.router.navigateByUrl('/menu-chofer');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Credenciales incorrectas');
    }
  }
  
  async popAlert(){
    const alert = await this.alertcontroller.create({
      header:'Error',
      message:"Usuario o contrasena incorrecta",
      buttons:['OK']
    })
    await alert.present();
  }
 
  async ionViewWillEnter() {
    await this.storage.create();
    this.message = 'Press Set, Then Press Get';
  }

  async setValue() {
    await this.storage.set('name', 'Max');
  }

  async getValue() {
    const value = await this.storage.get('name');
    this.message = `Got value ${value}`;
    console.log(this.message);
  }

  async enumerate() {
    this.storage.forEach((value, key, index) => {
      this.message = `ITEM - ${key} = ${value} [${index}]`
      console.log(this.message);
    });
  } 

}
