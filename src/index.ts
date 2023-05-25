import "./loadEnviroment.js";
import createDebug from "debug";
import app from "./server/index.js";
import chalk from "chalk";

const debug = createDebug("suspiria-api:root");

const port = process.env.PORT ?? 4000;

const localhost = `http://localhost:${port}`;

app.listen(port, () => {
  debug(`Listening on ${chalk.bgBlueBright(localhost)}`);
});
