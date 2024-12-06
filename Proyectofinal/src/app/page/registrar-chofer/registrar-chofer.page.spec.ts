import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarChoferPage } from './registrar-chofer.page';

describe('RegistrarChoferPage', () => {
  let component: RegistrarChoferPage;
  let fixture: ComponentFixture<RegistrarChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
