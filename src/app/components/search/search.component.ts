import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput : string = '';
  searchButtonDisabled : boolean = true;

  @Output() searchOutput = new EventEmitter<string>();

  inputChange() {
    if (this.searchInput != '' && this.searchInput != undefined && this.searchInput != null) {
      this.searchButtonDisabled = false;
    } else {
      this.searchButtonDisabled = true;
    }
  }

  public onSearch() : void {
    if (this.searchInput != '' && this.searchInput != undefined && this.searchInput != null) {
      this.searchOutput.emit(this.searchInput);
    }
  }
}
