import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FelicitacionPage } from './felicitacion.page';

describe('FelicitacionPage', () => {
  let component: FelicitacionPage;
  let fixture: ComponentFixture<FelicitacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
