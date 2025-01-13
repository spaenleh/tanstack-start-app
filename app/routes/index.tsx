import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button asChild>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
