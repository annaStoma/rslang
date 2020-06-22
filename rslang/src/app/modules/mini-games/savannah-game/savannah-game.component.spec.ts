import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SavannahGameComponent } from './savannah-game.component';

describe('SavannahGameComponent', () => {
  let component: SavannahGameComponent;
  let fixture: ComponentFixture<SavannahGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavannahGameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
