import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'], 
})
export class LoginPage implements OnInit {
  message= "";
  email=""
  password=""
  constructor(private firebase:FirebaseService, private router:Router, private alertcontroller:AlertController, private storage: Storage){ }


  async ngOnInit() {
    await this.storage.create();
  }


  async login(){
    try {
      let usuario=await this.firebase.auth(this.email,this.password);
      console.log(usuario);
      const navigationextras:NavigationExtras = {
        queryParams: {email:this.email, password:this.password, valor: 9999}
      };
      this.router.navigate(['/home'],navigationextras);
    } catch (error) {
      console.log(error);
      this.popAlert(); 
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
