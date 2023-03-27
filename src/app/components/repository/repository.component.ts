import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent {
  @Input() searchInput : string = '';

  ngOnChanges() : void {
    console.log("Inside repository component: " + this.searchInput);
  }

}
