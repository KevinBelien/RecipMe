import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabSearchPage } from './tab-search.page';

const routes: Routes = [
  {
    path: '',
    component: TabSearchPage
  },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabSearchPageRoutingModule {}
