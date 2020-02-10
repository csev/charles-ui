import { Timber } from "@timberio/browser";

export const SUGAR_API = process.env.SugarAPI || "http://localhost:8001";

const SUGAR_TIMBER_SOURCE_ID = process.env.SugarTimberSourceID;
const SUGAR_TIMBER_API_KEY = process.env.SugarTimberAPIKey;

export let logger = null;

if(SUGAR_TIMBER_API_KEY && SUGAR_TIMBER_SOURCE_ID) {
  logger = new Timber(SUGAR_TIMBER_API_KEY, SUGAR_TIMBER_SOURCE_ID)
}
