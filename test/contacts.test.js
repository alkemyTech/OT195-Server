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
        invalidFormat_2: {
            msg: "The field 'name' is required on the request params.",
        },
        invalidFormat_3: {
            msg: "The field 'email' is required on the request params.",
        },
        invalidFormat_4: {
            msg: "The field 'message' is required on the request params.",
        }
    }
};

const requests = {
    post: {
        invalidFormat_1: {
            name: "Example Test Name",
            email: "example",
            message: "example message"
        },
        invalidFormat_2: {
            email: "example@mail.com",
            message: "example message"
        },
        invalidFormat_3: {
            name: "Example Test Name",
            message: "example message"
        },
        invalidFormat_4: {
            name: "Example Test Name",
            email: "example@mail.com",
        },
        validFormat: {
            name: "Example Test Name",
            email: "example@mail.com",
            message: "example message"
        },
    }
};

const adminUserToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Im1jb25kZUB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHhCMU5GS0J2T1RFZzZPb2FhT3FZbi5aa0xTN29DNWZMNy9jZVVxWVhCWFhaZXBjS0JWdEttIiwicm9sZUlkIjoxLCJmaXJzdE5hbWUiOiJNYW51ZWwiLCJsYXN0TmFtZSI6IkNvbmRlIiwiZGVsZXRlZEF0IjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vd3d3LmRlc2lnbmV2by5jb20vcmVzL3RlbXBsYXRlcy90aHVtYl9zbWFsbC9jb2xvcmZ1bC1oYW5kLWFuZC13YXJtLWNvbW11bml0eS5wbmcifSwiaWF0IjoxNjU1NzU1Mjg1LCJleHAiOjE2NjM1MzEyODV9.8sOc-ZGD_H974fQfI7pHUZQR9Q0wO211quJWjFiomcw";

const regularUserToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJycm9tZXJvQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUDhSQkgySW1SbXM2N3BjNjkxTlhxZXZSa0hYQmd2NjhjelpzMWxGeUZRM3FLdmIza092ZGEiLCJyb2xlSWQiOjIsImZpcnN0TmFtZSI6IlJhcXVlbCIsImxhc3ROYW1lIjoiUm9tZXJvIiwiZGVsZXRlZEF0IjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vd3d3LmRlc2lnbmV2by5jb20vcmVzL3RlbXBsYXRlcy90aHVtYl9zbWFsbC9jb2xvcmZ1bC1oYW5kLWFuZC13YXJtLWNvbW11bml0eS5wbmcifSwiaWF0IjoxNjU1NzUzOTYxLCJleHAiOjE2NjM1Mjk5NjF9.BD6ETMXe6gptAqkVeaykOH6NWYiRyqbOKNWa9jMsCUQ";

describe("GET /contacts", ()=>{

    it("GET /contacts without JWT", (done) => {
        request.get("/contacts").then((res) => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toMatchObject(responses.rejected.withoutJWT);
            done();
        });
    });

    it("GET /contacts without admin permission", (done) => {
        request
            .get("/contacts")
            .set("X-Api-Key", regularUserToken)
            .then((res) => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toMatchObject(responses.rejected.withoutPermission);
            done();
        });
    });

    it("GET /contacts", (done) => {
        request
            .get("/contacts")
            .set("X-Api-Key", adminUserToken)
            .then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});

describe("POST /contacts", ()=>{
    it("POST /contacts with invalid format (Fields with incorrect data types)", (done) => {
        request
            .post("/contacts")
            .send(requests.post.invalidFormat_1)
            .then((res) => {
            expect(res.statusCode).toBe(500);
            done();
        });
    });

    it("POST /contacts with invalid format (Missing field 'name')", (done) => {
        request
        .post("/contacts")
        .send(requests.post.invalidFormat_2)
        .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(
            expect.objectContaining(responses.rejected.invalidFormat_2)
            );
            done();
        });
    });

    it("POST /contacts with invalid format (Missing field 'email')", (done) => {
        request
        .post("/contacts")
        .send(requests.post.invalidFormat_3)
        .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(
            expect.objectContaining(responses.rejected.invalidFormat_3)
            );
            done();
        });
    });
    it("POST /contacts with invalid format (Missing field 'message')", (done) => {
        request
        .post("/contacts")
        .send(requests.post.invalidFormat_4)
        .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(
            expect.objectContaining(responses.rejected.invalidFormat_4)
            );
            done();
        });
    });

    it("POST /contacts with valid format", (done) => {
        request
        .post("/contacts")
        .send(requests.post.validFormat)
        .then((res) => {
            expect(res.statusCode).toBe(201);
            done();
        });
    });
})