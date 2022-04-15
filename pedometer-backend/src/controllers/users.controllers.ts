import express from "express";
import {
  addUserToTeamService,
  getUserTeamCounterService,
  incrementUserCounterService,
} from "../services/users.services";
import {
  TEAM_COUNTER_DOES_NOT_EXIST,
  TEAM_COUNTER_EXISTS,
  USER_TEAM_COUNTER_DOES_NOT_EXIST,
  USER_TEAM_COUNTER_EXISTS,
} from "../utils/constants.utils";
import { response } from "../utils/response.utils";

export const addUserToTeam = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { teamName, userName } = req.params;
    const data = await addUserToTeamService(userName, teamName);

    return res
      .status(200)
      .send(response(req.__("ADD_USER_TO_TEAM_SUCCESS"), data));
  } catch (error) {
    if (error === TEAM_COUNTER_EXISTS) {
      return res
        .status(400)
        .send(response(req.__("TEAM_COUNTER_EXISTS"), { error }));
    }
    if (error === USER_TEAM_COUNTER_EXISTS) {
      return res
        .status(400)
        .send(response(req.__("USER_TEAM_COUNTER_EXISTS"), { error }));
    }
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};

export const incrementUserCounter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { teamName, userName } = req.params;
    const data = await incrementUserCounterService(userName, teamName);

    return res
      .status(200)
      .send(response(req.__("INCREMENT_TEAM_COUNTER_SUCCESS"), data));
  } catch (error) {
    if (error === TEAM_COUNTER_DOES_NOT_EXIST) {
      return res
        .status(400)
        .send(response(req.__("TEAM_COUNTER_DOES_NOT_EXIST"), { error }));
    }
    if (error === USER_TEAM_COUNTER_DOES_NOT_EXIST) {
      return res
        .status(400)
        .send(response(req.__("USER_TEAM_COUNTER_DOES_NOT_EXIST"), { error }));
    }
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};

export const getUserTeamCounter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { teamName, userName } = req.params;
    const data = await getUserTeamCounterService(userName, teamName);

    return res
      .status(200)
      .send(response(req.__("GET_TEAM_COUNTER_SUCCESS"), data));
  } catch (error) {
    if (error === TEAM_COUNTER_DOES_NOT_EXIST) {
      return res
        .status(400)
        .send(response(req.__("TEAM_COUNTER_DOES_NOT_EXIST"), { error }));
    }
    if (error === USER_TEAM_COUNTER_DOES_NOT_EXIST) {
      return res
        .status(400)
        .send(response(req.__("USER_TEAM_COUNTER_DOES_NOT_EXIST"), { error }));
    }
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};
