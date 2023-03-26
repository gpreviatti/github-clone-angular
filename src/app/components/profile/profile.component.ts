import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  searchInput : string = '';

  searchChanges(event : any) : void {
    console.log(event);
  }
}
