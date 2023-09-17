import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Repository } from 'src/app/models/repository';


describe('RepositoryComponent', () => {
  let fixture: ComponentFixture<RepositoryComponent>;

  let component: RepositoryComponent;

  let htmlElement : HTMLElement
  let table : HTMLTableElement

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        RepositoryComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        HttpClientTestingModule
      ]
    })
    .createComponent(RepositoryComponent);

    fixture.detectChanges();

    component = fixture.componentInstance;

    htmlElement = fixture.nativeElement as HTMLElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not get repositories when search term is null', () => {
    // Arrange
    component.searchInput = '';

    // Act
    component.ngOnChanges();
    fixture.detectChanges();
    table = htmlElement?.querySelector('#table-repositories') as HTMLTableElement

    // Assert
    expect(component.repositories.length).toBe(0);
    expect(table).toBeNull()
  });

  it('should get repositories when search term is not', () => {
    // Arrange
    component.searchInput = 'johnDoe';
    let repositories : Repository[] = [
      {
        id: 1,
        name: "example-repo",
        full_name: "your-username/example-repo",
        private: false,
        html_url: "https://github.com/your-username/example-repo",
        description: "A sample repository",
        url: "https://api.github.com/repos/your-username/example-repo",
        size: 1000,
        license: { name: "MIT License" },
      },
      {
        id: 2,
        name: "example-repo",
        full_name: "your-username/example-repo",
        private: false,
        html_url: "https://github.com/your-username/example-repo",
        description: "A sample repository",
        url: "https://api.github.com/repos/your-username/example-repo",
        size: 1000,
        license: { name: "MIT License" },
      },
    ]
    spyOn(component.service, 'getPublicRepositories').and.returnValue(of(repositories))

    // Act
    component.ngOnChanges();
    fixture.detectChanges();
    table = htmlElement?.querySelector('#table-repositories') as HTMLTableElement

    // Assert
    expect(component.repositories.length).toBeLessThanOrEqual(2);
    expect(table.rows.length).toBe(component.repositories.length + 1)
    expect(table.rows[0].innerHTML).toContain('ID')
    expect(table.rows[1].innerHTML).toContain('example-repo')
    expect(table.rows[2].innerHTML).toContain('example-repo')
  });
});
