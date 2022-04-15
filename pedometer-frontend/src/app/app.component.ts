import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { Team } from './types/teams.definitions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('teamNameInput') teamNameInput: ElementRef | undefined;
  title = 'Pedometer';
  teams: Team[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.refreshCountersList();
  }

  createTeamCounter() {
    this.dataService
      .createTeamCounter(this.teamNameInput?.nativeElement.value)
      .subscribe(() => {
        this.refreshCountersList();
      });
  }

  createUserTeamCounter(teamName:string) {
    const userName = (<HTMLInputElement>document.getElementById(`${teamName}-username`)).value;
    console.log(userName)
    this.dataService
      .createUserTeamCounter(userName, teamName)
      .subscribe(() => {
        this.refreshCountersList();
      });
  }

  incrementStepCount(userName: string, teamName: string) {
    this.dataService
      .incrementUserTeamCounter(userName, teamName)
      .subscribe(() => {
        this.refreshCountersList();
      });
  }

  refreshCountersList() {
    this.dataService.listCounters().subscribe((data: any) => {
      this.teams = data.data;
    });
  }

  customTB(index:any, item:any) {
    return `${index}-${item.id}`;
  }
}
