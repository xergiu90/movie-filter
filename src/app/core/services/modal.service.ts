import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@shared/components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '350px',
      height: '320px',
      disableClose: true
    });
  }
}
