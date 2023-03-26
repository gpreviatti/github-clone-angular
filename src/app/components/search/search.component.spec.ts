import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        BrowserAnimationsModule,
        MatInputModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
    let htmlElement = fixture.nativeElement as HTMLElement;
    let searchInput = component.searchInput;

    // Act
    let matLabel = htmlElement?.querySelector('#label-profile');
    let matInput = (htmlElement?.querySelector('#input-profile') as HTMLInputElement);

    // Assert
    expect(component).toBeTruthy();
    expect(matLabel?.innerHTML).toContain('Github Profile:');
    expect(matInput.value).toEqual(searchInput);
  });

  it('should change search value with success', () => {
    // Arrange
    let htmlElement = fixture.nativeElement as HTMLElement;
    let newValue = 'foo';
    component.searchInput = newValue;

    // Act
    // Force angular to emit the event that property changed
    fixture.detectChanges();
    let matInput = (htmlElement?.querySelector('#input-profile') as HTMLInputElement);

    // Assert
    expect(matInput.value).toEqual(newValue);
  });
});
