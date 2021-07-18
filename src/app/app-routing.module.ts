import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  {
    path: '',
    redirectTo: 'channel/general',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tabs/tab-search/recipe-detail/:id',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tab-favorites',
    loadChildren: () => import('./tab-favorites/tab-favorites.module').then( m => m.TabFavoritesPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tabs/tab-favorites/recipe-detail/:id',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tab-ingredients',
    loadChildren: () => import('./tab-ingredients/tab-ingredients.module').then( m => m.TabIngredientsPageModule)
  },
  {
    path: 'tabs/tab-home/recipe-detail/:id',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
