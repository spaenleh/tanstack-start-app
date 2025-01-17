import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<>({ resolver: zodResolver(loginSchema) });
  return <div>login</div>;
}
