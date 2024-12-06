import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarChoferPageRoutingModule } from './registrar-chofer-routing.module';

import { RegistrarChoferPage } from './registrar-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarChoferPageRoutingModule
  ],
  declarations: [RegistrarChoferPage]
})
export class RegistrarChoferPageModule {}
