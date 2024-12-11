import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginChoferPage } from './login-chofer.page';

describe('LoginChoferPage', () => {
  let component: LoginChoferPage;
  let fixture: ComponentFixture<LoginChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
