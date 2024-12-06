import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarChoferPage } from './registrar-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarChoferPageRoutingModule {}
