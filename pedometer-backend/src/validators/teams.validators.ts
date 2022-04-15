import { param } from "express-validator";

export const createTeamCounterValidator = [
  param("teamName")
    .isLength({ min: 3, max: 20 })
    .withMessage("INVALID_TEAM_NAME_LENGTH"),
];
