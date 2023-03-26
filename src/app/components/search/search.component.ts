import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput : string = 'gpreviatti';

  @Output('searchResult') searchResult = new EventEmitter();

  search() : void {
    this.searchResult.emit(this.searchInput);
  }
}
