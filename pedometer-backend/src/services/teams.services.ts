import { counterPool } from "../..";
import { Team } from "../definitions/teams.definitions";
import {
  TEAM_COUNTER_DOES_NOT_EXIST,
  TEAM_COUNTER_EXISTS,
} from "../utils/constants.utils";

export const createTeamCounterService = async (teamName: string) => {
  const team = counterPool.find((team: Team) => team.teamName === teamName);
  if (team) throw TEAM_COUNTER_EXISTS;
  counterPool.push({ teamName, score: 0, users: [] });
  return counterPool.sort((teamA, teamB) => teamB.score - teamA.score);
};

export const getTeamCounterService = async (teamName: string) => {
  const team = counterPool.find((team: Team) => team.teamName === teamName);
  if (!team) throw TEAM_COUNTER_DOES_NOT_EXIST;
  return team;
};

export const listTeamCountersService = async () => {
  return counterPool.sort((teamA, teamB) => teamB.score - teamA.score);
};
