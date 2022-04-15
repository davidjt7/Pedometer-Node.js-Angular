import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import * as http from "http";

import loggerConfig from "./src/config/logger.config";
import cors from "cors";
import { CommonRoutesConfig } from "./src/definitions/routes.definitions";
import debug from "debug";

import i18n from "./src/config/i18n.config";
import { configureRoutes } from "./src/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/documentation/openAPI.json";
import { Team } from "./src/definitions/teams.definitions";

const app: express.Application = express();
export const server: http.Server = http.createServer(app);
const port = process.env.PORT || 8080;
const debugLog: debug.IDebugger = debug("App");

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(i18n.init);
app.use(loggerConfig);

export const counterPool: Team[] = [];

const routes: Array<CommonRoutesConfig> = configureRoutes(app);
server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(`Server up at http://localhost:${port}`);
});

const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Team pedometer backend",
};
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
