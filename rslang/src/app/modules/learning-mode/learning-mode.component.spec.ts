import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModeComponent } from './learning-mode.component';

describe('LearningModeComponent', () => {
  let component: LearningModeComponent;
  let fixture: ComponentFixture<LearningModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearningModeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
