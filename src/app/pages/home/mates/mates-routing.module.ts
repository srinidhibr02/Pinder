import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatesPage } from './mates.page';

const routes: Routes = [
  {
    path: '',
    component: MatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatesPageRoutingModule {}
