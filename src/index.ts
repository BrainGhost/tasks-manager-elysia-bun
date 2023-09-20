import { PrismaClient } from '@prisma/client';
import { Elysia, t } from "elysia";


const db = new PrismaClient()

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/tasks/get-all/", async () => {
    return db.task.findMany().then((tasks: any) => {
      tasks
    })
  })
  .post("/tasks/create/", async ({ body }) => {
    db.task.create({
      data: body
    }), {
      body: t.Object({
        title: t.String(),
        description: t.String(),
      })
    }
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
