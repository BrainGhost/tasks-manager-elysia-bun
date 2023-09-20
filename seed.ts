const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedData = {
  users: [
    {
      email: "user1@example.com",
      phone: "123-456-7890",
      password: "password1",
      fullName: "John Doe",
    },
    {
      email: "user2@example.com",
      phone: "987-654-3210",
      password: "password2",
      fullName: "Jane Smith",
    },
  ],
  tasks: [
    {
      title: "Task 1",
      description: "Description for Task 1",
      status: "COMPLETED",
      priority: "HIGH",
      startDate: new Date("2023-09-20T08:00:00Z"),
      endDate: new Date("2023-09-22T17:00:00Z"),
      userId: 1, // Assign tasks to user IDs
    },
    {
      title: "Task 2",
      description: "Description for Task 2",
      status: "PENDING",
      priority: "MEDIUM",
      startDate: new Date("2023-09-21T10:00:00Z"),
      endDate: new Date("2023-09-23T15:00:00Z"),
      userId: 2,
    },
  ],
};

const main = async () => {
  console.log("Start seeding...");
  for (const user of seedData.users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
  for (const task of seedData.tasks) {
    const createdTask = await prisma.task.create({
      data: task,
    });
    console.log(`Created task with id: ${createdTask.id}`);
  }
  console.log("Seeding finished.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
