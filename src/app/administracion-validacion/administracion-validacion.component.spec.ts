import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionValidacionComponent } from './administracion-validacion.component';

describe('AdministracionValidacionComponent', () => {
  let component: AdministracionValidacionComponent;
  let fixture: ComponentFixture<AdministracionValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionValidacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
