import { useSession } from "vinxi/http";
import type { User } from "db/schema";
import { SESSION_SECRET } from "@/env";

type SessionUser = {
  userName: User["name"];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: SESSION_SECRET,
  });
}
