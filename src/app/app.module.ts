import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        timeOut: 2000,
        preventDuplicates: true,
        maxOpened: 1,
        autoDismiss: true,
        enableHtml: true},
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
