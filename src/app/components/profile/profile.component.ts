import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Profile } from 'src/app/models/profile';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() searchInput : string = '';

  profile : Profile;

  constructor(
    public spinner : NgxSpinnerService,
    public service: GithubService
  ) {}

  ngOnChanges() : void {
    this.getProfile();
  }

  hasSearch() : boolean {
    if (this.searchInput == null || this.searchInput == undefined || this.searchInput == '')
      return false;

    return true;
  }

  getProfile() {
    if(!this.hasSearch())
      return;

    this.spinner.show();
    this.service.getProfile(this.searchInput).subscribe({
      next: response => this.profile = response,
      error: error => console.error(error),
      complete: () => this.spinner.hide()
    })
  }
}
