import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabIngredientsPageRoutingModule } from './tab-ingredients-routing.module';

import { TabIngredientsPage } from './tab-ingredients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabIngredientsPageRoutingModule
  ],
  declarations: [TabIngredientsPage]
})
export class TabIngredientsPageModule {}
