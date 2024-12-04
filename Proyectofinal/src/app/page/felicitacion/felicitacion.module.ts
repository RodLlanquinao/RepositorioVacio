import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FelicitacionPageRoutingModule } from './felicitacion-routing.module';

import { FelicitacionPage } from './felicitacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FelicitacionPageRoutingModule
  ],
  declarations: [FelicitacionPage]
})
export class FelicitacionPageModule {}
