const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const responses = {
  rejected: {
    withoutJWT: {
      msg: "An API key is required in the request header.",
      errcode: "",
    },
    withoutPermission: {
      msg: "Access denied",
      ok: false,
    },
    invalidID: {
      msg: "Not found",
      ok: false,
    },
    invalidFormat_1: {
      //   msg: "The field 'content' is required on the request params.",
    },
    invalidFormat_2: {
      msg: "The field 'content' is required on the request params.",
    },
    invalidFormat_3: {
      msg: "The field 'name' is required on the request params.",
    },
  },
  accepted: {
    post: { msg: "Activity created succesfully", ok: true },
    put: { results: { msg: "Activity updated successfully.", ok: true } },
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

const adminUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRENzdJdGh1NGUxbDVEdHJRZFBpLzZ1T2hjcFk3MlhZNGZRMGNlamRnd1E4dGpJdmtxTkJnSyIsInJvbGVJZCI6MSwiZmlyc3ROYW1lIjoiVXN1YXJpbyIsImxhc3ROYW1lIjoiRGVtbyIsImRlbGV0ZWRBdCI6bnVsbCwiaW1hZ2UiOiJodHRwczovL3d3dy5kZXNpZ25ldm8uY29tL3Jlcy90ZW1wbGF0ZXMvdGh1bWJfc21hbGwvY29sb3JmdWwtaGFuZC1hbmQtd2FybS1jb21tdW5pdHkucG5nIn0sImlhdCI6MTY1NTE0MDgzNCwiZXhwIjoxNjYyOTE2ODM0fQ.pBJozqNP4KiKN2FhfT5qpfdyfg7NxlNqt3m42Nem-Lw";

const regularUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOSwiZW1haWwiOiJycm9tZXJvQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUDhSQkgySW1SbXM2N3BjNjkxTlhxZXZSa0hYQmd2NjhjelpzMWxGeUZRM3FLdmIza092ZGEiLCJyb2xlSWQiOjIsImZpcnN0TmFtZSI6IlJhcXVlbCIsImxhc3ROYW1lIjoiUm9tZXJvIiwiZGVsZXRlZEF0IjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vd3d3LmRlc2lnbmV2by5jb20vcmVzL3RlbXBsYXRlcy90aHVtYl9zbWFsbC9jb2xvcmZ1bC1oYW5kLWFuZC13YXJtLWNvbW11bml0eS5wbmcifSwiaWF0IjoxNjU1NDkzMTc5LCJleHAiOjE2NjMyNjkxNzl9.mTytNdlIkggcEv7k3fPgVgsECZBbPo36eW_BF_iZrFY";

describe("GET /activities", () => {
  it("GET /activities without JWT", (done) => {
    // Sends GET request to /activities endpoint
    request.get("/activities").then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toMatchObject(responses.rejected.withoutJWT);
      done();
    });
  });

  it("GET /activities without admin permission", (done) => {
    // Sends GET request to /activities endpoint
    request
      .get("/activities")
      .set("X-Api-Key", regularUserToken)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject(responses.rejected.withoutPermission);
        done();
      });
  });

  it("GET /activities", (done) => {
    // Sends GET request to /activities endpoint
    request
      .get("/activities")
      .set("X-Api-Key", adminUserToken)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /activities/:id", () => {
  it("GET /activities/:id with invalid id", (done) => {
    // Sends GET request to /activities/:id endpoint
    // JWT is not required
    request.get("/activities/1000").then((res) => {
      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject(responses.rejected.invalidID);
      done();
    });
  });

  it("GET /activities/:id with invalid format", (done) => {
    // Sends GET request to /activities/:id endpoint
    // JWT is not required
    request.get("/activities/aodb-s3").then((res) => {
      expect(res.statusCode).toBe(400);
      done();
    });
  });

  it("GET /activities/:id", (done) => {
    // Sends GET request to /activities/:id endpoint
    // JWT is not required
    request.get("/activities/2").then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe("POST /activities", () => {
  it("POST /activities without JWT", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .send(requests.post.validFormat)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject(responses.rejected.withoutJWT);
        done();
      });
  });

  it("POST /activities without admin permission", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .set("X-Api-Key", regularUserToken)
      .send(requests.post.validFormat)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject(responses.rejected.withoutPermission);
        done();
      });
  });

  it("POST /activities with invalid format (Fields with incorrect data types)", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .set("X-Api-Key", adminUserToken)
      .send(requests.post.invalidFormat_1)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  it("POST /activities with invalid format (Missing field 'name')", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .set("X-Api-Key", adminUserToken)
      .send(requests.post.invalidFormat_2)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining(responses.rejected.invalidFormat_2)
        );
        done();
      });
  });

  it("POST /activities with invalid format (Missing field 'content')", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .set("X-Api-Key", adminUserToken)
      .send(requests.post.invalidFormat_3)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining(responses.rejected.invalidFormat_3)
        );
        done();
      });
  });

  it("POST /activities with valid format and admin permission", (done) => {
    // Sends POST request to /activities endpoint
    request
      .post("/activities")
      .set("X-Api-Key", adminUserToken)
      .send(requests.post.validFormat)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        done();
      });
  });
});

describe("PUT /activities/:id", () => {
  it("PUT /activities without JWT", (done) => {
    // Sends PUT request to /activities/:id endpoint
    request
      .put("/activities/2")
      .send(requests.put.validFormat_1)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject(responses.rejected.withoutJWT);
        done();
      });
  });

  it("PUT /activities/:id without admin permission", (done) => {
    // Sends PUT request to /activities/:id endpoint
    request
      .put("/activities/2")
      .set("X-Api-Key", regularUserToken)
      .send(requests.put.validFormat_1)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject(responses.rejected.withoutPermission);
        done();
      });
  });

  it("PUT /activities/:id with invalid format (Fields with incorrect data types)", (done) => {
    // Sends PUT request to /activities endpoint
    request
      .put("/activities/2")
      .set("X-Api-Key", adminUserToken)
      .send(requests.put.invalidFormat)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  it("PUT /activities/:id with valid format and admin permission", (done) => {
    // Sends PUT request to /activities endpoint
    request
      .put("/activities/2")
      .set("X-Api-Key", adminUserToken)
      .send(requests.put.validFormat_1)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(responses.accepted.put);
        done();
      });
  });

  it("PUT /activities/:id updating a single field", (done) => {
    // Sends PUT request to /activities endpoint
    request
      .put("/activities/2")
      .set("X-Api-Key", adminUserToken)
      .send(requests.put.validFormat_2)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(responses.accepted.put);
        done();
      });
  });
});
