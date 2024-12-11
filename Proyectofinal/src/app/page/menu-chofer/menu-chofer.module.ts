import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuChoferPageRoutingModule } from './menu-chofer-routing.module';

import { MenuChoferPage } from './menu-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuChoferPageRoutingModule
  ],
  declarations: [MenuChoferPage]
})
export class MenuChoferPageModule {}
