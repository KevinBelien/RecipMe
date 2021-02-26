import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabSearchPageRoutingModule } from './tab-search-routing.module';

import { TabSearchPage } from './tab-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabSearchPageRoutingModule
  ],
  declarations: [TabSearchPage]
})
export class TabSearchPageModule {}
