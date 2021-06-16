import { Injectable } from '@angular/core';

interface Link {
  url(args?: string[]): string;
}

/*
 * Defines the internal links that one can navigate to.
 * Usage:
 * this.RoutingService.HOME.url();
 * this.RoutingService.PASSWORD_RESET.url(['someToken']);
 */
@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  readonly HOME: Link = {url: () => `/home`};
  readonly FAVORITES: Link = {url: () => `/favorites`};

  _errorHandlingOverwriteRoutes = [];

  get errorHandlingOverwriteRoutes() {
    return this._errorHandlingOverwriteRoutes;
  }

  addErrorHandlingOverwriteRoutes(route: string) {
    if (!this.errorHandlingOverwriteRoutes.includes(route)) {
      this.errorHandlingOverwriteRoutes.push(route);
    }
  }

  removeErrorHandlingOverwriteRoutes(route) {
    if (this.errorHandlingOverwriteRoutes.includes(route)) {
      this.errorHandlingOverwriteRoutes.splice(this.errorHandlingOverwriteRoutes.indexOf(route), 1);
    }
  }
}
