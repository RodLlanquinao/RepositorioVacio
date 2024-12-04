import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarConductorPage } from './registrar-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarConductorPageRoutingModule {}
