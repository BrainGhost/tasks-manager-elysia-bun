import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";

const db = new PrismaClient();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/tasks/get-all/", async () => {
    const tasks = await db.task.findMany();
    return Response(JSON.stringify(tasks));
  })
  .post("/tasks/create/", async ({ body }) => {
    const createdTask = await db.task.create({
      data: {
        title: "Rental",
        description: "Life is amazing if you have money",
        startDate: new Date(),
        endDate: new Date(),
        userId: 1,
      },
    });
    return Response(JSON.stringify(createdTask));
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
