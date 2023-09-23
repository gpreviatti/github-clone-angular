import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Profile } from 'src/app/models/profile';
import { of, timeout } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let htmlElement : HTMLElement;

  let labelLogin : HTMLLabelElement;
  let labelId : HTMLLabelElement;
  let avatarImage : HTMLImageElement;
  let labelName : HTMLLabelElement;
  let labelCompany : HTMLLabelElement;
  let labelLocation : HTMLLabelElement;
  let labelEmail : HTMLLabelElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        HttpClientModule,
        NgxSpinnerModule
      ],
      providers: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.spinner, 'show');
    spyOn(component.spinner, 'hide');

    htmlElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get profile when service returns data', () => {
    // Arrange
    component.searchInput = 'johnDoe';
    const profile : Profile  = {
      login: 'johnDoe',
      id: 1,
      avatar_url: 'https://gravatar.com/johnDoe',
      company: 'Acme',
      email: 'johnDoe@acme.com',
      location: 'West us',
      name: 'John Doe'
    }

    spyOn(component.service, 'getProfile').and.returnValue(of(profile));

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    labelLogin = htmlElement?.querySelector('#login') as HTMLLabelElement;
    labelId = htmlElement?.querySelector('#profile-id') as HTMLLabelElement;
    avatarImage = htmlElement?.querySelector('#avatar-image') as HTMLImageElement;
    labelName = htmlElement?.querySelector('#name') as HTMLLabelElement;
    labelCompany = htmlElement?.querySelector('#company') as HTMLLabelElement;
    labelLocation = htmlElement?.querySelector('#location') as HTMLLabelElement;
    labelEmail = htmlElement?.querySelector('#email') as HTMLLabelElement;

    // Assert
    expect(component.profile).toEqual(profile);
    expect(component.service.getProfile).toHaveBeenCalledTimes(1);
    expect(component.spinner.show).toHaveBeenCalledTimes(1);
    expect(component.spinner.hide).toHaveBeenCalledTimes(1);

    expect(labelLogin.innerText).not.toBeNull();
    expect(labelLogin.innerText).toBe(profile.login);

    expect(labelId.innerText).not.toBeNull();
    expect(labelId.innerText).toBe(profile.id.toString());

    expect(avatarImage.innerText).not.toBeNull();
    expect(avatarImage.src).toBe(profile.avatar_url);

    expect(labelName.innerText).not.toBeNull();
    expect(labelName.innerText).toBe(profile.name);

    expect(labelCompany.innerText).not.toBeNull();
    expect(labelCompany.innerText).toBe(profile.company);

    expect(labelLocation.innerText).not.toBeNull();
    expect(labelLocation.innerText).toBe(profile.location);

    expect(labelEmail.innerText).not.toBeNull();
    expect(labelEmail.innerText).toBe(profile.email);
  });

  it('Should not get profile when search if null', () => {
    // Arrange
    component.searchInput = '';
    spyOn(component.service, 'getProfile');

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    labelLogin = htmlElement?.querySelector('#login') as HTMLLabelElement;
    labelId = htmlElement?.querySelector('#profile-id') as HTMLLabelElement;
    avatarImage = htmlElement?.querySelector('#avatar-image') as HTMLImageElement;
    labelName = htmlElement?.querySelector('#name') as HTMLLabelElement;
    labelCompany = htmlElement?.querySelector('#company') as HTMLLabelElement;
    labelLocation = htmlElement?.querySelector('#location') as HTMLLabelElement;
    labelEmail = htmlElement?.querySelector('#email') as HTMLLabelElement;

    // Assert
    expect(component.profile).toBeUndefined();
    expect(component.service.getProfile).toHaveBeenCalledTimes(0);
    expect(component.spinner.show).toHaveBeenCalledTimes(0);
    expect(component.spinner.hide).toHaveBeenCalledTimes(0);

    expect(labelLogin).toBeNull();
    expect(labelId).toBeNull();
    expect(avatarImage).toBeNull();
    expect(labelName).toBeNull();
    expect(labelCompany).toBeNull();
    expect(labelLocation).toBeNull();
    expect(labelEmail).toBeNull();
  });
});
