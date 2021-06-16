import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private stateService: StateService
  ) {
  }


  setUserData(res: User) {
    localStorage.setItem('currentUser', JSON.stringify(res));
    this.stateService.setCurrentUser(res);
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
