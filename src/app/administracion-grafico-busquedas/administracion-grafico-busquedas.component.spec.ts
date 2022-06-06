import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionGraficoBusquedasComponent } from './administracion-grafico-busquedas.component';

describe('AdministracionGraficoBusquedasComponent', () => {
  let component: AdministracionGraficoBusquedasComponent;
  let fixture: ComponentFixture<AdministracionGraficoBusquedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionGraficoBusquedasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionGraficoBusquedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
