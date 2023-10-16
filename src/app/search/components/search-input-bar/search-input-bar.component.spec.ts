import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputBarComponent } from './search-input-bar.component';

describe('SearchInputBarComponent', () => {
  let component: SearchInputBarComponent;
  let fixture: ComponentFixture<SearchInputBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
