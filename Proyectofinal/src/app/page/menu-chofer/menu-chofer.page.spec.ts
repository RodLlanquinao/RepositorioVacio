import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuChoferPage } from './menu-chofer.page';

describe('MenuChoferPage', () => {
  let component: MenuChoferPage;
  let fixture: ComponentFixture<MenuChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
