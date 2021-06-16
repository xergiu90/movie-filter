import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@shared/components/login/login.component';
import { users } from '../../app.constants';
import { RoutingService } from './routing.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users = users;

  constructor(
    private router: Router,
    private stateService: StateService,
    private routingService: RoutingService,
  ) {
    if (localStorage.getItem('loggedIn')) {
      this.stateService.setLoggedInStatus(true);
      this.stateService.setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    }
  }

  login(email, password) {
    let isValid = false;
    users.forEach(
      user => {
        if(user.email === email && user.password === password){
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.stateService.setLoggedInStatus(true);
          this.stateService.setCurrentUser(user);
          isValid = true;
        }
      }
    );

    return isValid;
  }

  logout() {
    this.router.navigate([this.routingService.HOME.url()]);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('APIkey');
    this.stateService.setLoggedInStatus(false);
  }
}
