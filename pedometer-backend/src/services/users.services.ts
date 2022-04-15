import { counterPool } from "../..";
import { Team, User } from "../definitions/teams.definitions";
import {
  TEAM_COUNTER_DOES_NOT_EXIST,
  TEAM_COUNTER_EXISTS,
  USER_TEAM_COUNTER_DOES_NOT_EXIST,
  USER_TEAM_COUNTER_EXISTS,
} from "../utils/constants.utils";

export const addUserToTeamService = async (
  userName: string,
  teamName: string
) => {
  const obj = counterPool.find((team: Team) => team.teamName === teamName);
  if (!obj) throw TEAM_COUNTER_EXISTS;
  const user = obj.users.find((user: User) => user.userName === userName);
  if (user) throw USER_TEAM_COUNTER_EXISTS;
  obj.users.push({ userName, stepCount: 0 });
  return counterPool.sort((teamA, teamB) => teamB.score - teamA.score);
};

export const incrementUserCounterService = async (
  userName: string,
  teamName: string
) => {
  const obj = counterPool.find((team: Team) => team.teamName === teamName);
  if (!obj) throw TEAM_COUNTER_DOES_NOT_EXIST;
  const user = obj.users.find((user: User) => user.userName === userName);
  if (!user) throw USER_TEAM_COUNTER_DOES_NOT_EXIST;
  user.stepCount++;
  obj.score++;
  return counterPool.sort((teamA, teamB) => teamB.score - teamA.score);
};

export const getUserTeamCounterService = async (
  userName: string,
  teamName: string
) => {
  const obj = counterPool.find((team: Team) => team.teamName === teamName);
  if (!obj) throw TEAM_COUNTER_DOES_NOT_EXIST;
  const user = obj.users.find((user: User) => user.userName === userName);
  if (!user) throw USER_TEAM_COUNTER_DOES_NOT_EXIST;
  return user;
};
