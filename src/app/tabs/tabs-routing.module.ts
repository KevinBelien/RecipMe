import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        loadChildren: () => import('../tab-home/tab-home.module').then(m => m.TabHomePageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'tab-search',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'tab-favorites',
        loadChildren: () => import('../tab-favorites/tab-favorites-routing.module').then(m => m.TabFavoritesPageRoutingModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'tab-ingredients',
        loadChildren: () => import('../tab-ingredients/tab-ingredients-routing.module').then(m => m.TabIngredientsPageRoutingModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
