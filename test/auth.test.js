const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const responses = {
  rejected: {
    invalidEmail: {
      msg: "Invalid email",
    },
    invalidPassword: {
      msg: "Invalid password",
    },
    missingFields: {
      msg: "Invalid value",
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
  },
};

const requests = {
  post: {
    invalidFormat_1: {
      name: true,
      content: false,
    },
    invalidFormat_2: {
      name: "Example Test Name",
    },
    invalidFormat_3: {
      content: "<p>Example content</p>",
    },
    validFormat: {
      name: "Example Test Name",
      content: "<p>Example content</p>",
    },
  },
  put: {
    invalidFormat: {
      name: true,
      content: false,
    },
    validFormat_1: {
      name: "Apoyo Escolar Nivel Secundaria",
      content:
        "<p>Del mismo modo que en primaria, este taller es el coraz&oacute;n del &aacute;rea secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas y de 16 a 18 horas en el contraturno. Actualmente se encuentran inscriptos en el taller 50 adolescentes entre 13 y 20 a&ntilde;os. Aqu&iacute; los jovenes se presentan con el material que traen del colegio y una docente de la instituci&oacute;n y un grupo de voluntarios los recibe para ayudarlos a estudiar o hacer la tarea. Este espacio tambi&eacute;n es utilizado por los j&oacute;venes como un punto de encuentro y relaci&oacute;n entre ellos y la instituci&oacute;n.</p>",
    },
    validFormat_2: {
      name: "Apoyo Escolar Nivel Secundaria",
    },
  },
};

describe("POST /auth/login", () => {
  it("POST /auth/login with wrong 'email' field data type", (done) => {
    request
      .post("/auth/login")
      .send({ email: true, password: "1234" })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidEmail);
        done();
      });
  });

  it("POST /auth/login with wrong 'password' field data type", (done) => {
    request
      .post("/auth/login")
      .send({ email: "test@test.com", password: true })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.invalidPassword);
        done();
      });
  });

  it("POST /auth/login with missing fields", (done) => {
    request
      .post("/auth/login")
      .send({})
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject(responses.rejected.missingFields);
        done();
      });
  });

  it("POST /auth/login with an unregistered user", (done) => {
    request
      .post("/auth/login")
      .send({ email: "example@example.com", password: "1234" })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject(responses.rejected.notFound);
        done();
      });
  });

  it("POST /auth/login with a soft deleted user", (done) => {
    request
      .post("/auth/login")
      .send({ email: "test@test.com", password: "1234" })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject(responses.rejected.notFound);
        done();
      });
  });

  it("POST /auth/login successfully", (done) => {
    request
      .post("/auth/login")
      .send({ email: "mconde@test.com", password: "Sc4M3urV" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(responses.accepted.login);
        done();
      });
  });
});

// describe("POST /auth/register", ()=> {

//     it()

// })

// describe("GET /auth/me", ()=> {

//     it()

// })
