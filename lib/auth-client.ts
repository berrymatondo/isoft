import { createAuthClient } from "better-auth/react";

let path = process.env.BETTER_AUTH_URL!;

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: path,
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
