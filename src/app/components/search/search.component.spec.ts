import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
        MatInputModule,
        FormsModule
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

  fit('should change search value with success', <any>fakeAsync(() => {
    // Arrange
    let htmlElement = fixture.nativeElement as HTMLElement;
    let newValue = 'foo';
    let searchResult = component.searchResult;
    component.searchInput = newValue;

    // Act
    // Force angular to emit the event that property changed
    fixture.detectChanges();

    //It means firstly you need to set value and then wait while angular is updating control value because it will happen inside
    tick();

    let matInput = (htmlElement?.querySelector('#input-profile') as HTMLInputElement);

    // Assert
    expect(matInput.value).toEqual(newValue);
  }));
});
