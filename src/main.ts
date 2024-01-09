import { AppModule } from "./module.js";
import express from "express";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("app:");

const startApp = async () => {
  const app = new AppModule(express());
  try {
    await app.start();
    debug(chalk.green("Succesfully launched application"));
  } catch (error) {
    debug(chalk.red("Failed starting the application"));
  }
};

await startApp();
