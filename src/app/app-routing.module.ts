import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './core/guards/authentication.guard.service';

const routes: Routes = [
  {
    path: 'home',
    // pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [
      AuthenticationGuardService
    ],
  },
  {
    path: 'favorites',
    // pathMatch: 'full',
    loadChildren: () => import('./pages/favorites/favourites.module').then(m => m.FavouritesModule),
    canActivate: [
      AuthenticationGuardService
    ],
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full' },
  {
    path: '**',
    // pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [
      AuthenticationGuardService
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
