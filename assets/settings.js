import { Timber } from "@timberio/browser";

export const FIRE_API = process.env.FireAPI || "http://localhost:8001";

const FIRE_TIMBER_SOURCE_ID = process.env.FireTimberSourceID;
const FIRE_TIMBER_API_KEY = process.env.FireTimberAPIKey;

export let logger = null;

if(FIRE_TIMBER_API_KEY && FIRE_TIMBER_SOURCE_ID) {
  logger = new Timber(FIRE_TIMBER_API_KEY, FIRE_TIMBER_SOURCE_ID)
}
