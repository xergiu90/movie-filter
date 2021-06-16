import { NgModule } from '@angular/core';
import { AuthenticationService, HttpService } from '@core/services';
import { AuthenticationGuardService } from './guards/authentication.guard.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    HttpService,
    AuthenticationGuardService,
    AuthenticationService,
  ]
})
export class CoreModule {
}
