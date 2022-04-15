import { CommonRoutesConfig } from "../definitions/routes.definitions";
import express from "express";
import {
  createTeamCounter,
  getTeamCounter,
  listTeamCounters,
} from "../controllers/teams.controllers";
import { createTeamCounterValidator } from "../validators/teams.validators";
import {
  addUserToTeam,
  getUserTeamCounter,
  incrementUserCounter,
} from "../controllers/users.controllers";

export class TeamsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TeamsRoutes");
  }

  configureRoutes() {
    this.app.route("/teams").get(listTeamCounters);

    this.app
      .route("/teams/:teamName")
      .post(createTeamCounterValidator, createTeamCounter)
      .get(getTeamCounter);

    this.app
      .route("/teams/:teamName/users/:userName")
      .post(addUserToTeam)
      .put(incrementUserCounter)
      .get(getUserTeamCounter);

    return this.app;
  }
}
