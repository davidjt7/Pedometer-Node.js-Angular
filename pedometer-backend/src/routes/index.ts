import { CommonRoutesConfig } from "../definitions/routes.definitions";
import express from "express";
import { TeamsRoutes } from "./teams.routes";

export const configureRoutes = (app: express.Application) => {
  const routes: Array<CommonRoutesConfig> = [];
  routes.push(new TeamsRoutes(app));
  return routes;
};
