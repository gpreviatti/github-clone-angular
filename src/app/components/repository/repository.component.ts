import { Component, Input } from '@angular/core';
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

  constructor(public service : GithubService) {}

  ngOnInit() : void {
    if (this.searchInput != '' && this.searchInput != null) {
      this.getRepositories();
    }
  }

  ngOnChanges() : void {
    this.ngOnInit();
  }

  getRepositories() : void {
    this.service.getPublicRepositories(this.searchInput).subscribe({
      next: response => this.repositories = response,
      error: error => console.error(error)
    })
  }
}
