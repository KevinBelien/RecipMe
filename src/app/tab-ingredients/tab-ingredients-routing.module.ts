import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabIngredientsPage } from './tab-ingredients.page';

const routes: Routes = [
  {
    path: '',
    component: TabIngredientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabIngredientsPageRoutingModule {}
