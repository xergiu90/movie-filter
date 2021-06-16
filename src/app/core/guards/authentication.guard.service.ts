import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ModalService } from '@core/services/modal.service';
import { AuthenticationService, StateService } from '../services';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private stateService: StateService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.checkIfUserIsAuthenticated()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  private checkIfUserIsAuthenticated(): boolean {
    if (!this.stateService.getLoggedInStatusSubject().getValue()) {
      this.modalService.openLoginModal();
      return false;
    } else {
      return true;
    }
  }
}
