"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  usenrame: string;
  birthDay: string;
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "see-my-planet",
    password: process.env.COOKIE_PASSWORD!,
  });
}
