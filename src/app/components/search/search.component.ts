import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput : string = 'gpreviatti';

  @Output('searchResult') searchResult = new EventEmitter();

  ngOnChanges() : void {
    console.log('ngOnChanges was called');
    console.log(this.searchInput);
  }

  search() : void {
    this.searchResult.emit(this.searchInput);
  }
}
