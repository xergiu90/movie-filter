import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutes } from './favourites.routes';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(FavouritesRoutes),
  ],
  declarations: [
    FavouritesComponent
  ],
  exports: [
  ]
})
export class FavouritesModule {
}
