const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const responses = {
  rejected: {
    invalidName: {
      msg: "Name must contain only letters",
    },
    shortName: {
      msg: "Name must contain at least 4 characters",
    },
    invalidSurname: {
      msg: "Name must contain only letters",
    },
    shortSurname: {
      msg: "Surname must contain at least 4 characters",
    },
    invalidPassword: {
      msg: "Invalid password",
    },
    invalidPassword_number: {
      msg: "Password must contain a number",
    },
    invalidPassword_uppercase: {
      msg: "Password must contain an uppercase letter",
    },
    invalidPassword_lowercase: {
      msg: "Password must contain a lowercase letter",
    },
    shortPassword: {
      msg: "Password must contain at least 7 characters",
    },
    invalidEmail: {
      msg: "Invalid email",
    },
    missingFields: {
      msg: "Invalid value",
    },
    exisitingEmail: {
      msg: "Email already exists",
    },
    notFound: {
      msg: "Not Found.",
      ok: false,
    },
  },
  accepted: {
    login: {
      results: {
        data: {},
      },
    },
    register: {
      msg: "User created succesfully",
      ok: true,
    },
  },
};

const requests = {
  register: {
    wrongName: {
      firstName: new Date(),
      lastName: "Test",
      email: "example@example.com",
      password: "Password123",
    },
    wrongSurname: {
      firstName: "Name test",
      lastName: new Date(),
      email: "example@example.com",
      password: "Password123",
    },
    wrongEmail: {
      firstName: "Name test",
      lastName: "Test",
      email: new Date(),
      password: "Password123",
    },
    wrongPass: {
      firstName: "Name test",
      lastName: "Test",
      password: "Password123",
      password: new Date(),
    },
    shortName: {
      firstName: "123",
      lastName: "Test",
      email: "example@example.com",
      password: "Password123",
    },
    shortSurname: {
      firstName: "Name Test",
      lastName: "123",
      email: "example@example.com",
      password: "Password123",
    },
    shortPassword: {
      firstName: "Name Test",
      lastName: "Test",
      email: "example@example.com",
      password: "123456",
    },
    passWithoutNumber: {
      firstName: "Name Test",
      lastName: "Test",
      email: "example@example.com",
      password: "Password",
    },
    passWithoutLowercase: {
      firstName: "Name Test",
      lastName: "Test",
      email: "example@example.com",
      password: "PASSWORD123",
    },
    passWithoutUppercase: {
      firstName: "Name Test",
      lastName: "Test",
      email: "example@example.com",
      password: "password123",
    },
    accepted: {
      firstName: "Name Test",
      lastName: "Test",
      email: "example@example.com",
      password: "Password123",
    },
    existingEmail: {
      firstName: "Name Test",
      lastName: "Test",
      email: "mconde@test.com",
      password: "Password123",
    },
  },
};

// describe("POST /auth/login", () => {
//   it("POST /auth/login with wrong 'email' field data type", (done) => {
//     request
//       .post("/auth/login")
//       .send({ email: true, password: "1234" })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toMatchObject(responses.rejected.invalidEmail);
//         done();
//       }).catch((err) => done(err));
//   });

//   it("POST /auth/login with wrong 'password' field data type", (done) => {
//     request
//       .post("/auth/login")
//       .send({ email: "test@test.com", password: true })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toMatchObject(responses.rejected.invalidPassword);
//         done();
//       }).catch((err) => done(err));
//   });

//   it("POST /auth/login with missing fields", (done) => {
//     request
//       .post("/auth/login")
//       .send({})
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toMatchObject(responses.rejected.missingFields);
//         done().catch((err) => done(err));
//       });
//   });

//   it("POST /auth/login with an unregistered user", (done) => {
//     request
//       .post("/auth/login")
//       .send({ email: "example@example.com", password: "1234" })
//       .then((res) => {
//         expect(res.statusCode).toBe(404);
//         expect(res.body).toMatchObject(responses.rejected.notFound);
//         done().catch((err) => done(err));
//       });
//   });

//   it("POST /auth/login with a soft deleted user", (done) => {
//     request
//       .post("/auth/login")
//       .send({ email: "test@test.com", password: "1234" })
//       .then((res) => {
//         expect(res.statusCode).toBe(404);
//         expect(res.body).toMatchObject(responses.rejected.notFound);
//         done().catch((err) => done(err));
//       });
//   });

//   it("POST /auth/login successfully", (done) => {
//     request
//       .post("/auth/login")
//       .send({ email: "mconde@test.com", password: "Sc4M3urV" })
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toMatchObject(responses.accepted.login);
//         done().catch((err) => done(err));
//       });
//   });
// });

describe("POST /auth/register", () => {
  it("POST /auth/register with a wrong value data type in 'firstName' field", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.wrongName)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidName);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'firstName' field shorter than 4 characters", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.wrongName)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidName);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a wrong value data type in 'lastName' field", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.wrongSurname)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidSurname);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'lastName' field shorter than 4 characters", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.shortSurname)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.shortSurname);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a wrong value data type in 'email' field", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.wrongEmail)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidEmail);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a wrong value data type in 'password' field", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.wrongPass)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidPassword);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'password' field shorter than 7 characters", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.shortPassword)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.shortPassword);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'password' without numbers", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.passWithoutNumber)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(
          responses.rejected.invalidPassword_number
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'password' without uppercase letters", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.passWithoutUppercase)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(
          responses.rejected.invalidPassword_uppercase
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with a value in 'password' without lowercase letters", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.passWithoutLowercase)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(
          responses.rejected.invalidPassword_lowercase
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register with an existing email", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.existingEmail)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.exisitingEmail);
        done();
      })
      .catch((err) => done(err));
  });

  it("POST /auth/register successfully", (done) => {
    request
      .post("/auth/register")
      .send(requests.register.accepted)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(responses.accepted.login);
        done();
      })
      .catch((err) => done(err));
  });
});

// describe("GET /auth/me", ()=> {

//     it()

// })
