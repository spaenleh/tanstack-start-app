import { getAllUsersQueryOptions } from "@/services/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/users")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getAllUsersQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Suspense fallback="Loading users...">
        <UsersComponent />
      </Suspense>
    </div>
  );
}

function UsersComponent() {
  const allUsersQuery = useSuspenseQuery(getAllUsersQueryOptions());

  return (
    <ul>
      {allUsersQuery.data.map((user) => (
        <li key={user.id}>
          {user.name} ({user.id})
        </li>
      ))}
    </ul>
  );
}
