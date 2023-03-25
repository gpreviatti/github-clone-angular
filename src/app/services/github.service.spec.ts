import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Repository } from "../models/repository";
import { User } from '../models/user';

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
      login: "gpreviatti",
      name: "Giovanni B. Previatti",
      location: "Campinas, Sp Brazil"
    } as User))

    let login = "gpreviatti";
    let name = "Giovanni B. Previatti";
    let location = "Campinas, Sp Brazil";

    // Act, Assert
    service.GetProfile(login).subscribe(
      (user) => {
        expect(user).not.toBeNull;
        expect(user.login).toEqual(login);
        expect(user.name).toEqual(name);
        expect(user.location).toEqual(location);

        done();
      },
      error => done.fail()
    );

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get repositories with success', (done: DoneFn) => {

    // Arrange
    httpClientSpy.get.and.returnValue(of([
      {name: 'foo', full_name: 'gpreviatti/foo'},
      {name: 'bar', full_name: 'gpreviatti/bar'}
    ] as Repository[]))
    let login = "gpreviatti";

    // Act, Assert
    service.GetPublicRepositories(login).subscribe(
      repositories => {
        expect(repositories).not.toBeNull;
        expect(repositories.length).toBeLessThanOrEqual(2);

        done();
      },
      () => done.fail()
    );

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});
