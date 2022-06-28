import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: '.env' || '.env.example' });

export const CONFIG = {
  PORT: process.env.PORT || 7730,
};
