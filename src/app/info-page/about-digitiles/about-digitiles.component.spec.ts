import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDigitilesComponent } from './about-digitiles.component';

describe('AboutDigitilesComponent', () => {
  let component: AboutDigitilesComponent;
  let fixture: ComponentFixture<AboutDigitilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDigitilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDigitilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
