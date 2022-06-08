import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEngComponent } from './info-eng.component';

describe('InfoEngComponent', () => {
  let component: InfoEngComponent;
  let fixture: ComponentFixture<InfoEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
