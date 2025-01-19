import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";
import { useAppSession } from "@/utils/session";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";

const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  await session.clear();
  throw redirect({ to: "/" });
});

export const Route = createFileRoute("/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  const logout = useServerFn(logoutFn);
  return (
    <div className="p-5 flex flex-col gap-10 place-items-center">
      <TypographyLarge>
        It is sad to see you leave, come back soon!
      </TypographyLarge>
      <Button onClick={() => logout()}>Log me out</Button>
    </div>
  );
}
