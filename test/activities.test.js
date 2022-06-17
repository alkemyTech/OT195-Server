const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const responseWithoutJWT = {
  msg: "An API key is required in the request header.",
  errcode: "",
};

const responseWithoutPermission = {
  msg: "Access denied",
  ok: false,
};

const adminUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRENzdJdGh1NGUxbDVEdHJRZFBpLzZ1T2hjcFk3MlhZNGZRMGNlamRnd1E4dGpJdmtxTkJnSyIsInJvbGVJZCI6MSwiZmlyc3ROYW1lIjoiVXN1YXJpbyIsImxhc3ROYW1lIjoiRGVtbyIsImRlbGV0ZWRBdCI6bnVsbCwiaW1hZ2UiOiJodHRwczovL3d3dy5kZXNpZ25ldm8uY29tL3Jlcy90ZW1wbGF0ZXMvdGh1bWJfc21hbGwvY29sb3JmdWwtaGFuZC1hbmQtd2FybS1jb21tdW5pdHkucG5nIn0sImlhdCI6MTY1NTE0MDgzNCwiZXhwIjoxNjYyOTE2ODM0fQ.pBJozqNP4KiKN2FhfT5qpfdyfg7NxlNqt3m42Nem-Lw";

const regularUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOSwiZW1haWwiOiJycm9tZXJvQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUDhSQkgySW1SbXM2N3BjNjkxTlhxZXZSa0hYQmd2NjhjelpzMWxGeUZRM3FLdmIza092ZGEiLCJyb2xlSWQiOjIsImZpcnN0TmFtZSI6IlJhcXVlbCIsImxhc3ROYW1lIjoiUm9tZXJvIiwiZGVsZXRlZEF0IjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vd3d3LmRlc2lnbmV2by5jb20vcmVzL3RlbXBsYXRlcy90aHVtYl9zbWFsbC9jb2xvcmZ1bC1oYW5kLWFuZC13YXJtLWNvbW11bml0eS5wbmcifSwiaWF0IjoxNjU1NDkzMTc5LCJleHAiOjE2NjMyNjkxNzl9.mTytNdlIkggcEv7k3fPgVgsECZBbPo36eW_BF_iZrFY";

// it("GET /activities without JWT", (done) => {
//   // Sends GET request to /activities endpoint
//   request.get("/activities").then((res) => {
//     expect(res.statusCode).toBe(401);
//     expect(res.body).toMatchObject(responseWithoutJWT);
//     done();
//   });
// });

it("GET /activities without admin permission", (done) => {
  // Sends GET request to /activities endpoint
  request
    .get("/activities")
    .set("X-Api-Key", regularUserToken)
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toMatchObject(responseWithoutPermission);
      done();
    });
});
