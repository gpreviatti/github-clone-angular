import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  readonly RESOURCE_URL : string = "https://api.github.com/";

  constructor(private httpClient : HttpClient) { }

  getProfile(login: string) : Observable<Profile> {
    return this.httpClient.get<Profile>(this.RESOURCE_URL + "users/" + login)
  }

  getPublicRepositories(login: string) : Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(this.RESOURCE_URL + "users/" + login + "/repos")
  }
}
