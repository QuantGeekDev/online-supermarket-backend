import "dotenv/config";
import cookieSession from "cookie-session";
import cors, { type CorsOptions } from "cors";
import express, { type Application } from "express";
import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("server:");

const corsOptions: CorsOptions = {
  origin: [process.env.FRONTEND_URL ?? "", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export class AppModule {
  constructor(public app: Application) {
    app.set("trust-proxy", true);
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieSession({ signed: false, secure: false }));
  }

  start = async () => {
    if (!process.env.MONGODB_URL) {
      throw new Error("Missing MONGODB_URL environment variable");
    }

    const mongoDbUrl = process.env.MONGODB_URL;
    try {
      await mongoose.connect(mongoDbUrl);
    } catch (error) {
      throw new Error("Error connecting to database");
    }

    debug(chalk.green("Succesfully connected to database"));
    const port = process.env.PORT ?? 8080;
    const serverUrl = chalk.blue(`http://localhost:${port}/`);

    this.app.listen(port, () => {
      debug(chalk.green(`Listening on ${serverUrl}`));
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET environment variable");
    }
  };
}
