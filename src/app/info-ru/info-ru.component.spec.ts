import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRuComponent } from './info-ru.component';

describe('InfoRuComponent', () => {
  let component: InfoRuComponent;
  let fixture: ComponentFixture<InfoRuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
