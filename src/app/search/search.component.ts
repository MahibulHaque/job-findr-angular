import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  childValue: string = '';

  ngOnInit(): void {
    
  }

  onChildValueChange(newValue: string) {
    this.childValue = newValue;
    console.log(this.childValue);
  }
}
