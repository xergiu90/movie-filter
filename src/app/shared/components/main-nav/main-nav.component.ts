import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user.model';
import { AuthenticationService, RoutingService, StateService } from '@core/services';
import { ModalService } from '@core/services/modal.service';


@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent implements OnInit {
  currentUser: User;
  loggedIn: boolean;
  apiKey: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
    public router: Router,
    public stateService: StateService,
    public routingService: RoutingService,
    private modalService: ModalService
  ) {

    stateService.getLoggedInStatus().subscribe(
      logged => {
        this.loggedIn = logged;
      }
    );

    stateService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.cdr.markForCheck();
    });

    this.apiKey = JSON.parse(localStorage.getItem('APIkey'));
  }

  ngOnInit() {
    this.stateService.setApiKey(this.apiKey);
  }

  onLogout() {
    this.authService.logout();
    this.modalService.openLoginModal();
  }

  setAPIKey (event) {
    localStorage.setItem('APIkey', JSON.stringify(event.target.value));
    this.stateService.setApiKey(event.target.value);
  }
}
