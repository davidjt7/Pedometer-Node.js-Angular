import express from "express";
import {
  createTeamCounterService,
  getTeamCounterService,
  listTeamCountersService,
} from "../services/teams.services";
import { response } from "../utils/response.utils";
import { validationResult } from "express-validator";
import {
  TEAM_COUNTER_DOES_NOT_EXIST,
  TEAM_COUNTER_EXISTS,
} from "../utils/constants.utils";

export const createTeamCounter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: req.__("INVALID_REQUEST"),
        errors: errors.array().map((error) => {
          return { ...error, msg: req.__(error.msg) };
        }),
      });
    }

    const { teamName } = req.params;
    const data = await createTeamCounterService(teamName);

    return res
      .status(200)
      .send(response(req.__("CREATE_TEAM_COUNTER_SUCCESS"), data));
  } catch (error) {
    if (error === TEAM_COUNTER_EXISTS) {
      return res
        .status(400)
        .send(response(req.__("TEAM_COUNTER_EXISTS"), { error }));
    }
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};

export const getTeamCounter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { teamName } = req.params;
    const data = await getTeamCounterService(teamName);

    return res
      .status(200)
      .send(response(req.__("GET_TEAM_COUNTER_SUCCESS"), data));
  } catch (error) {
    if (error === TEAM_COUNTER_DOES_NOT_EXIST) {
      return res
        .status(400)
        .send(response(req.__("TEAM_COUNTER_DOES_NOT_EXIST"), { error }));
    }
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};

export const listTeamCounters = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await listTeamCountersService();

    return res
      .status(200)
      .send(response(req.__("LIST_TEAM_COUNTER_SUCCESS"), data));
  } catch (error) {
    return res
      .status(500)
      .send(response((error as Error).message, error as Error));
  }
};
