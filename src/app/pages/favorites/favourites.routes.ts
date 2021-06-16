import { Routes } from '@angular/router';
import { FavouritesComponent } from './favourites.component';

export const FavouritesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FavouritesComponent,
  }
];
