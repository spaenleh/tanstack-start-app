import { Button } from "@/components/ui/button";
import { userScoreBoardsOptions } from "@/services/scoreboards";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    const user = context.user;
    if (!user) {
      throw redirect({ to: "/login", search: { url: "/dashboard" } });
    }
    return { authedUser: user };
  },
  loader: async ({ context }) => {
    const userId = context.user?.id;
    if (userId) {
      context.queryClient.ensureQueryData(userScoreBoardsOptions(userId));
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center gap-10 p-2">
      <Suspense fallback="Loading Dashboards...">
        <Dashboards />
      </Suspense>
      <Button asChild>
        <Link to="/scoreboard/new">New ScoreBoard</Link>
      </Button>
    </div>
  );
}

function Dashboards() {
  const { authedUser } = Route.useRouteContext();
  const { data: dashboards } = useSuspenseQuery(
    userScoreBoardsOptions(authedUser.id)
  );
  if (dashboards.length) {
    return (
      <div>
        {dashboards.map((d) => (
          <div key={d.id}>{d.name}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center">
      You do not have any dashboards yet.
      <br />
      Create one with the button below 👇
    </div>
  );
}
