import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput : string = 'gpreviatti';

  @Output() searchOutput = new EventEmitter<string>();

  search() : void {
    this.searchOutput.emit(this.searchInput);
  }
}
