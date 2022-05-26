import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionQueryComponent } from './administracion-query.component';

describe('AdministracionQueryComponent', () => {
  let component: AdministracionQueryComponent;
  let fixture: ComponentFixture<AdministracionQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
