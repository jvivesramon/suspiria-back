import "./loadEnviroment.js";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/app.js";
import connectToDatabase from "./database/connectDatabase.js";

const debug = createDebug("suspiria-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

const localhost = `http://localhost:${port}`;

if (!mongoDbConnection) {
  debug(chalk.hex("ff0013").underline("Missing enviroment variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on ${chalk.bgBlueBright(localhost)}`);
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.green("Connected to database"));
} catch (error) {
  debug(
    chalk
      .bgHex("ff2e32")
      .underline(
        `Error connecting to database: ${chalk.bgYellow(
          (error as Error).message
        )}`
      )
  );
}
