import { useSession } from "vinxi/http";
import type { User } from "db/schema";

type SessionUser = {
  userEmail: User["email"];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired",
  });
}
