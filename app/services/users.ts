import { hashPassword } from "@/utils/auth";
import { useAppSession } from "@/utils/session";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import db from "db/connection";
import { users } from "db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userCredentialsSchema = z.object({
  name: z.string().min(3).max(50),
  password: z.string().min(8),
});
export type UserCredentials = z.infer<typeof userCredentialsSchema>;

export const createUser = createServerFn({ method: "POST" })
  .validator(userCredentialsSchema)
  .handler(async ({ data }) => {
    // check if user already exists
    const user = await db.query.users.findFirst({
      where: eq(users.name, data.name),
    });

    const hashedPassword = await hashPassword(data.password);
    const session = await useAppSession();

    if (user) {
      // passwords do not match return user already exists
      if (hashedPassword !== user.passwordHash) {
        await session.clear();
        return { error: true, message: "User already exists" };
      }
      // passwords match, log the user in.
      await session.update({ userName: user.name });
      throw redirect({ to: "/dashboard" });
    }

    const res = await db
      .insert(users)
      .values({ name: data.name, passwordHash: hashedPassword })
      .returning();

    await session.update({ userName: res[0].name });

    throw redirect({ to: "/dashboard" });
  });

export const loginUserFn = createServerFn({ method: "POST" })
  .validator(userCredentialsSchema)
  .handler(async ({ data }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.name, data.name),
    });

    if (!user) {
      return { error: true, message: "User does not exist" };
    }

    const hashedPassword = await hashPassword(data.password);
    if (hashedPassword !== user.passwordHash) {
      return { error: true, message: "Credentials error" };
    }

    const session = await useAppSession();

    session.update({ userName: user.name });

    throw redirect({ to: "/dashboard" });
  });

export const getAllUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    // add artificial delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.query.users.findMany({ columns: { passwordHash: false } });
  }
);
export const getAllUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
