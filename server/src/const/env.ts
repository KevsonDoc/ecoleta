import { config } from "dotenv";

config();

export const ENV = {
  PORT: process.env.APP_PORT,
};
