import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionModificarBBDDComponent } from './administracion-modificar-bbdd.component';

describe('AdministracionModificarBBDDComponent', () => {
  let component: AdministracionModificarBBDDComponent;
  let fixture: ComponentFixture<AdministracionModificarBBDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionModificarBBDDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionModificarBBDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
