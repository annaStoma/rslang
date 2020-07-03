import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SavannahComponent } from './savannah.component';

describe('SavannahComponent', () => {
  let component: SavannahComponent;
  let fixture: ComponentFixture<SavannahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavannahComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
