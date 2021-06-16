import { EventEmitter, Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  private apiKey: BehaviorSubject<string> = new BehaviorSubject(null);
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authEvent: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  authEmit(action: string) {
    this.authEvent.emit(action);
  }

  getAuthEventEmitter(): EventEmitter<string> {
    return this.authEvent;
  }

  public setApiKey(res) {
    this.apiKey.next(res);
  }

  public getApiKey(): Observable<string> {
    return this.apiKey.asObservable();
  }

  public setCurrentUser(res) {
    this.currentUser.next(new User(res));
  }

  public getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }


  public getLoggedInStatusSubject(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  public setLoggedInStatus(state: boolean) {
    this.isLoggedIn.next(state);
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable().pipe(
      filter(res => res !== null)
    );
  }
}
