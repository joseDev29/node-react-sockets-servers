const nodeENV = process.env.NODE_ENV;

if (nodeENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();

  const chalk = require("chalk");
  console.log(chalk.blue("-----> development environment <-----"));
}

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: nodeENV,
  },
};
