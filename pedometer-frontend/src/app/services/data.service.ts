import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_ROUTE = environment.api_route;

  constructor(private httpClient: HttpClient) {}

  public listCounters() {
    return this.httpClient.get(`${this.API_ROUTE}/teams`);
  }
  public getCounter(teamName: string) {
    return this.httpClient.get(`${this.API_ROUTE}/teams/${teamName}`);
  }
  public createTeamCounter(teamName: string) {
    return this.httpClient.post(`${this.API_ROUTE}/teams/${teamName}`, {});
  }
  public createUserTeamCounter(userName: string, teamName: string) {
    return this.httpClient.post(
      `${this.API_ROUTE}/teams/${teamName}/users/${userName}`,
      {}
    );
  }
  public incrementUserTeamCounter(userName: string, teamName: string) {
    return this.httpClient.put(
      `${this.API_ROUTE}/teams/${teamName}/users/${userName}`,
      {}
    );
  }
  public getUserTeamCounter(userName: string, teamName: string) {
    return this.httpClient.get(
      `${this.API_ROUTE}/teams/${teamName}/users/${userName}`
    );
  }
}
