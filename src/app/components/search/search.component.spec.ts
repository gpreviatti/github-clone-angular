import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SearchComponent } from './search.component'

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>
  let htmlElement : HTMLElement

  let input : HTMLInputElement
  let button : HTMLButtonElement
  let label : HTMLLabelElement

  let component : SearchComponent

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule
      ]
    })
    .createComponent(SearchComponent)

    fixture.detectChanges()

    component = fixture.componentInstance

    htmlElement = fixture.nativeElement as HTMLElement
    input = (htmlElement?.querySelector('#input-profile') as HTMLInputElement)
    button = (htmlElement?.querySelector('#search-button') as HTMLButtonElement)
    label = htmlElement?.querySelector('#label-profile') as HTMLLabelElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(label?.innerHTML).toContain('Github Profile:')
    expect(input.value).toEqual(component.searchInput)
    expect(button?.innerHTML).toContain('Search')
    expect(button.disabled).toBeTruthy()
  })

  it('should change search value with success', <any>fakeAsync(() => {
    // Arrange
    const newValue = input.value = 'foo'

    // Act
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'))

    // Force angular to emit the event that property changed
    fixture.detectChanges()

    // Assert
    expect(component.searchInput).toEqual(newValue)
    expect(button.disabled).toBeFalsy()
  }))

  it('should not enable search button when input is null', <any>fakeAsync(() => {
    // Arrange
    const newValue = input.value = ''

    // Act
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'))

    // Force angular to emit the event that property changed
    fixture.detectChanges()

    // Assert
    expect(component.searchInput).toEqual(newValue)
    expect(button.disabled).toBeTruthy()
  }))

  it('should emit event when click button with success', <any>fakeAsync(() => {
    // Arrange
    const newValue = input.value = 'johnDoe'
    spyOn(component.searchOutput, 'emit')

    // Act
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'))

    // Force angular to emit the event that property changed
    fixture.detectChanges()

    button.dispatchEvent(new Event('click'))

    // Assert
    expect(component.searchInput).toEqual(newValue)
    expect(button.disabled).toBeFalsy()
    expect(component.searchOutput.emit).toHaveBeenCalledWith(component.searchInput)
  }))

  it('should not emit event when search input is null', <any>fakeAsync(() => {
    // Arrange
    const newValue = input.value = ''
    spyOn(component.searchOutput, 'emit')

    // Act
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'))

    // Force angular to emit the event that property changed
    fixture.detectChanges()

    button.dispatchEvent(new Event('click'))

    // Assert
    expect(component.searchInput).toEqual(newValue)
    expect(button.disabled).toBeTruthy()
    expect(component.searchOutput.emit).toHaveBeenCalledTimes(0)
  }))
})
