import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoadmapComponent } from './project-roadmap.component';

describe('ProjectRoadmapComponent', () => {
  let component: ProjectRoadmapComponent;
  let fixture: ComponentFixture<ProjectRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRoadmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
