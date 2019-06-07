import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeMonthComponent } from './resume-month.component';

describe('ResumeMonthComponent', () => {
  let component: ResumeMonthComponent;
  let fixture: ComponentFixture<ResumeMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
