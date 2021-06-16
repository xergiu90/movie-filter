import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(HomeRoutes),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
  ]
})
export class HomeModule {
}
