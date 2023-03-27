import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '🐙 Github Clone';
  searchResult : string;

  searchChanges(search : string) : void {
    this.searchResult = search;
  }
}
