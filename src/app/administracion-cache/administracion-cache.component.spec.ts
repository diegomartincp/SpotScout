import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionCacheComponent } from './administracion-cache.component';

describe('AdministracionCacheComponent', () => {
  let component: AdministracionCacheComponent;
  let fixture: ComponentFixture<AdministracionCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionCacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
