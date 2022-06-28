const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models").User;

const testRegularUser = {
  email: "rromero@test.com",
  password: "KK9FVd4P",
};

const testAdminUser = {
  email: "mconde@test.com",
  password: "Sc4M3urV",
};

describe("GET /users", () => {
  test("Fails if user is not logged in", async () => {
    await api.get("/users").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await api
        .post("/auth/login")
        .send({
          email: testRegularUser.email,
          password: testRegularUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await api
        .get("/users")
        .set("X-Api-key", loggedUser.body.results.token)
        .expect(401);
    }, 100000);

    test("Succeeds if user is admin", async () => {
      const loggedUser = await api
        .post("/auth/login")
        .send({
          email: testAdminUser.email,
          password: testAdminUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await api
        .get("/users")
        .set("X-Api-key", loggedUser.body.results.token)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);
  });
});

describe("DELETE /users/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.delete("/users/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await api
        .post("/auth/login")
        .send({
          email: testRegularUser.email,
          password: testRegularUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await api
        .delete(`/users/1`)
        .set("X-Api-key", loggedUser.body.results.token)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445";

        const loggedUser = await api
          .post("/auth/login")
          .send({
            email: testAdminUser.email,
            password: testAdminUser.password,
          })
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await api
          .delete(`/users/${invalidId}`)
          .set("X-Api-key", loggedUser.body.results.token)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const newUser = {
          firstName: "Test",
          lastName: "User",
          email: "testUser5@alkemy.com",
          password: "vvyEU3tu",
          roleId: 2,
        };

        await api
          .post("/auth/register")
          .send(newUser)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        const newUserData = await User.findOne({
          where: { email: newUser.email },
        });

        const loggedUser = await api
          .post("/auth/login")
          .send({
            email: testAdminUser.email,
            password: testAdminUser.password,
          })
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await api
          .delete(`/users/${newUserData.id}`)
          .set("X-Api-key", loggedUser.body.results.token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      }, 100000);
    });
  });
});
