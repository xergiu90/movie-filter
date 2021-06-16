import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { LoginComponent } from '@shared/components/login/login.component';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';
import { MovieDetailsComponent } from '@shared/components/movie-details/movie-details.component';
import { MaterialModule } from '@shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexModule,
    CoreModule
  ],
  declarations: [
    MainNavComponent,
    LoginComponent,
    MovieDetailsComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MainNavComponent,
    FlexModule
  ],
  providers: []
})
export class SharedModule {
}
