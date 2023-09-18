import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Repository } from 'src/app/models/repository';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent {
  @Input() searchInput : string = '';

  repositories : Repository[] = [];

  constructor(
    public service : GithubService,
    public spinner: NgxSpinnerService
  ) {}

  ngOnInit() : void {
    if (this.searchInput != '' && this.searchInput != null) {
      this.getRepositories();
    }
  }

  ngOnChanges() : void {
    this.ngOnInit();
  }

  getRepositories() : void {
    this.spinner.show();
    this.service.getPublicRepositories(this.searchInput).subscribe({
      next: response => {
        this.repositories = response;
        this.spinner.hide();
      },
      error: error => {
        console.error(error)
        this.repositories = [];
        this.spinner.hide();
      }
    })
  }
}
