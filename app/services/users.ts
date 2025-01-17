import { useAppSession } from "@/utils/session";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import db from "db/connection";
import { users } from "db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const createUser = createServerFn({ method: "POST" })
  .validator(createUserSchema)
  .handler(async ({ data }) => {
    // check if user already exists
    const user = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (user) {
      return new Response("Email already used", { status: 400 });
    }

    const res = await db.insert(users).values(data).returning();

    const session = await useAppSession();
    session.update({ userEmail: res[0].email });

    throw redirect({ to: "/dashboard" });
  });

export const getAllUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.select().from(users);
  }
);
export const getAllUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
