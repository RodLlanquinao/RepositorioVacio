import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuChoferPage } from './menu-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: MenuChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuChoferPageRoutingModule {}
