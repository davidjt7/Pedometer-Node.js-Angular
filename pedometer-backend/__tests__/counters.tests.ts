import { test, expect, afterAll } from "@jest/globals";
import { server } from "..";
import {
  createTeamCounterService,
  getTeamCounterService,
  listTeamCountersService,
} from "../src/services/teams.services";
import {
  addUserToTeamService,
  incrementUserCounterService,
} from "../src/services/users.services";

afterAll((done) => {
  server.close();
  done();
});

test("initializes counters for team 'Red' and team 'Blue' to 0", async () => {
  const teams = await createTeamCounterService("Red");
  expect(teams[0].teamName).toBe("Red");
  expect(teams[0].score).toBe(0);
  expect(teams[0].users).toStrictEqual([]);
  await createTeamCounterService("Blue");
});

test("initializes counters for users 'Eddie' and 'Thor' in teams 'Red' and 'Blue' respectively to 0", async () => {
  await addUserToTeamService("Eddie", "Red");
  const teams = await addUserToTeamService("Thor", "Blue");
  const redTeam = teams.find((team) => team.teamName === "Red");
  const eddie = redTeam?.users.find((user) => user.userName === "Eddie");
  const blueTeam = teams.find((team) => team.teamName === "Blue");
  const thor = blueTeam?.users.find((user) => user.userName === "Thor");
  expect(eddie?.userName).toBe("Eddie");
  expect(thor?.userName).toBe("Thor");
  expect(eddie?.stepCount).toBe(0);
  expect(thor?.stepCount).toBe(0);
});

test("increments counter for user 'Thor' in team 'Blue' by 1", async () => {
  const team = await getTeamCounterService("Blue");
  await incrementUserCounterService("Thor", "Blue");
  expect(team.score).toBe(1);
});

test("lists counters for all teams, Red -> 1, Blue -> 0", async () => {
  const teams = await listTeamCountersService();
  const redTeam = teams.find((team) => team.teamName === "Red");
  const blueTeam = teams.find((team) => team.teamName === "Blue");

  expect(redTeam?.score).toBe(0);
  expect(blueTeam?.score).toBe(1);
});
