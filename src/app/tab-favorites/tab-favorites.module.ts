import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabFavoritesPageRoutingModule } from './tab-favorites-routing.module';

import { TabFavoritesPage } from './tab-favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabFavoritesPageRoutingModule
  ],
  declarations: [TabFavoritesPage]
})
export class TabFavoritesPageModule {}
