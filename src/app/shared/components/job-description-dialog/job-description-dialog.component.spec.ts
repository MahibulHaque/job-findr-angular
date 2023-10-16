import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDialogComponent } from './job-description-dialog.component';

describe('JobDescriptionDialogComponent', () => {
  let component: JobDescriptionDialogComponent;
  let fixture: ComponentFixture<JobDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
