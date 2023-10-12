import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularJobsCardComponent } from './popular-jobs-card.component';

describe('PopularJobsCardComponent', () => {
  let component: PopularJobsCardComponent;
  let fixture: ComponentFixture<PopularJobsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularJobsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularJobsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
