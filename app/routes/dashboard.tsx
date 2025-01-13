import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button asChild>
        <Link to="/scoreboard/new">New ScoreBoard</Link>
      </Button>
    </div>
  );
}
