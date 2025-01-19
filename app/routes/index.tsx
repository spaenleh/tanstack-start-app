import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="py-[100px] flex flex-col place-items-center gap-5 bg-slate-200">
      <h3>Welcome Home!!!</h3>
      <div className="flex flex-col gap-2">
        <Button asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/login">Login or create an account</Link>
        </Button>
      </div>
    </div>
  );
}
