import { Button } from "@/components/ui/button";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login", search: { url: "/dashboard" } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
        <Link to="/scoreboard/new">New ScoreBoard</Link>
      </Button>
    </div>
  );
}
