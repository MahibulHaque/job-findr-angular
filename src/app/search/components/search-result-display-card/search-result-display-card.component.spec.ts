import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultDisplayCardComponent } from './search-result-display-card.component';

describe('SearchResultDisplayCardComponent', () => {
  let component: SearchResultDisplayCardComponent;
  let fixture: ComponentFixture<SearchResultDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
