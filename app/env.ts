import "dotenv/config";

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "Missing required env variable 'SESSION_SECRET', it must be defined."
  );
}
export const SESSION_SECRET = process.env.SESSION_SECRET;
