import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Repository } from "../models/repository";
import { Profile } from '../models/profile';

import { GithubService } from './github.service';

describe('GithubService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GithubService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GithubService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get profile with success', (done: DoneFn) => {
    // Arrange
    httpClientSpy.get.and.returnValue(of({
      login: "dummy",
      name: "Dummy Dummy",
      location: "São Paulo Brazil"
    } as Profile))

    let login = "dummy";
    let name = "Dummy Dummy";
    let location = "São Paulo Brazil";

    // Act, Assert
    service.getProfile(login).subscribe({
      next: response => {
        expect(response).not.toBeNull;
        expect(response.login).toEqual(login);
        expect(response.name).toEqual(name);
        expect(response.location).toEqual(location);

        done();
      },
      error: () => done.fail()
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get repositories with success', (done: DoneFn) => {

    // Arrange
    httpClientSpy.get.and.returnValue(of([
      {name: 'foo', full_name: 'dummy/foo'},
      {name: 'bar', full_name: 'dummy/bar'}
    ] as Repository[]))
    let login = "dummy";

    // Act, Assert
    service.getPublicRepositories(login).subscribe({
      next: response => {
        expect(response).not.toBeNull;
        expect(response.length).toBeLessThanOrEqual(2);

        done();
      },
      error: () => done.fail()
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});
