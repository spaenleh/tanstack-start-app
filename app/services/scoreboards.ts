import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import db from "db/connection";
import { z } from "zod";

// input schema definition to get the scoreboards of a user
const userScoreBoardsSchema = z.object({ userId: z.number() });

// tanstack start server function to get the scoreboards of a user
export const getUserScoreBoards = createServerFn({ method: "GET" })
  .validator(userScoreBoardsSchema)
  .handler(async ({ data }) => {
    const scoreBoards = await db.query.scoreBoards.findMany({
      where: (scoreBoards, { eq }) => eq(scoreBoards.userId, data.userId),
    });

    return scoreBoards;
  });

// react query options to get the scoreboards of a user
export const userScoreBoardsOptions = (userId: number) =>
  queryOptions({
    queryKey: ["scoreboards"],
    queryFn: () => getUserScoreBoards({ data: { userId } }),
  });
