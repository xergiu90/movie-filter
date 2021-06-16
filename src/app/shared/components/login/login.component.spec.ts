import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { dialogMock, mockLoginData } from '@core/mocks/login.mock';
import { LoginComponent } from '@shared/components/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Login Component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Test Form validity', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('expect form submit to fail', () => {
      const form = component.loginForm;
      expect(form.valid).toBeFalsy();
    });

    it('expect email to be required', () => {
      let errors = {};
      let email = component.loginForm.controls['email'];
      errors = email.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('expect email pattern to be correct', () => {
      let errors = {};
      let email = component.loginForm.controls['email'];
      email.setValue(mockLoginData.invalid.emailInvalid);
      errors = email.errors || {};
      expect(errors['email']).toBeTruthy();
    });

    it('expect email to be valid', () => {
      let email = component.loginForm.controls['email'];
      email.setValue(mockLoginData.valid.email);
      expect(email.valid).toBeTruthy();
    });

    it('expect password to be required', () => {
      let errors = {};
      let password = component.loginForm.controls['password'];
      password.setValue(mockLoginData.invalid.passwordRequired);
      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('expect password to be valid', () => {
      let password = component.loginForm.controls['password'];
      password.setValue(mockLoginData.valid.password);
      expect(password.valid).toBeTruthy();
    });

    it('expect form submit to be valid', () => {
      const form = component.loginForm;
      let email = component.loginForm.controls['email'];
      let password = component.loginForm.controls['password'];
      email.setValue(mockLoginData.valid.email);
      password.setValue(mockLoginData.valid.password);
      expect(form.valid).toBeTruthy();
    });

    it('expect form submit to trigger modal close', fakeAsync(() => {
      const form = component.loginForm;
      let email = form.controls['email'];
      let password = form.controls['password'];
      spyOn(dialogMock , 'close');

      email.setValue(mockLoginData.valid.email);
      password.setValue(mockLoginData.valid.password);

      let button = fixture.debugElement.nativeElement.querySelector('.login-button');
      button.click();
      tick();
      expect(dialogMock.close).toHaveBeenCalled();
    }));
  });

});
