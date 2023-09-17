import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  readonly RESOURCE_URL : string = "https://api.github.com/";

  constructor(private httpClient : HttpClient) { }

  getProfile(login: string) : Observable<User> {
    return this.httpClient.get<User>(this.RESOURCE_URL + "users/" + login)
  }

  getPublicRepositories(login: string) : Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(this.RESOURCE_URL + "users/" + login + "/repos")
  }
}
