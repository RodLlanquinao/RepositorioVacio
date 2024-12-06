import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  async auth(email:string, password:string){
    const request=await this.afAuth.signInWithEmailAndPassword(email,password);
    return request
  }

  async registrar(email:string, password:string){
    const request=await this.afAuth.createUserWithEmailAndPassword(email,password);
    this.router.navigateByUrl('felicitacion'); 
    return request
  }

  

  async registrarChofer(email:string, password:string, nombre: string, apellido: string){
    const request=await this.afAuth.createUserWithEmailAndPassword(email,password);
    this.router.navigateByUrl('felicitacion'); 
    return request
  }

  

  async recuperar(email:string){
    const request=await this.afAuth.sendPasswordResetEmail(email);
    return request
  }
  async logout(){
    await this.afAuth.signOut(); 
  }
}
