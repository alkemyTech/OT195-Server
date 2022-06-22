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
        location: "body",
        msg: "The field 'name' is required.",
        param: "name",
    },
    invalidFormat_3: {
      location: "body",
      msg: "The field 'name' is required.",
      param: "name",
    },
  },
  accepted: {
    post: { msg: "Activity created succesfully", ok: true },
    put:  { msg: "Member updated succesfully", ok:true } ,
  },
};
const requests = {
    post: {
      invalidFormat_1: {
        name: true,
        description: false,
        role: false,
        image: true,
      },
      invalidFormat_2: {
        description: "Example Test description",
      },
      invalidFormat_3: {
        description: "<p>Example content</p>",
      },
      validFormat: {
        name: "Example Test Name",
        image: "www.image.com",
        role: "CEO",
        description: "Example description",
      },
    },
    put: {
      invalidFormat: {
        id: true,
      },
      validFormat_1: {
        id: 2,
      },
      validFormat_2: {
        id: 2,
        name: "Example changed test name"
      },
    },
  };
  
  const adminUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNCwiZW1haWwiOiJtY296emV0dGlAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRYSkQvZWozTnVkbXMucWpjZnpJTXh1Ykd6RjhydGFYZ3pIeTFRa3RzbzVCemhVWkx1YTVRQyIsInJvbGVJZCI6MSwiZmlyc3ROYW1lIjoiTcOheGltbyIsImxhc3ROYW1lIjoiQ296emV0dGkiLCJkZWxldGVkQXQiOm51bGwsImltYWdlIjoiaHR0cHM6Ly93d3cuZGVzaWduZXZvLmNvbS9yZXMvdGVtcGxhdGVzL3RodW1iX3NtYWxsL2NvbG9yZnVsLWhhbmQtYW5kLXdhcm0tY29tbXVuaXR5LnBuZyJ9LCJpYXQiOjE2NTU4NjY1NDQsImV4cCI6MTY2MzY0MjU0NH0.kZ59fsQmDcd_rZ2k5MpJ-DL2wasxvqq963rbaLHCev0"  
  const regularUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNywiZW1haWwiOiJycm9tZXJvQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUDhSQkgySW1SbXM2N3BjNjkxTlhxZXZSa0hYQmd2NjhjelpzMWxGeUZRM3FLdmIza092ZGEiLCJyb2xlSWQiOjIsImZpcnN0TmFtZSI6IlJhcXVlbCIsImxhc3ROYW1lIjoiUm9tZXJvIiwiZGVsZXRlZEF0IjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vd3d3LmRlc2lnbmV2by5jb20vcmVzL3RlbXBsYXRlcy90aHVtYl9zbWFsbC9jb2xvcmZ1bC1oYW5kLWFuZC13YXJtLWNvbW11bml0eS5wbmcifSwiaWF0IjoxNjU1ODY2MTY5LCJleHAiOjE2NjM2NDIxNjl9.o7BHx9qSegVEuOduLG7K3nysX0WqLh16WjYp4-MPYdk"

    
    describe("GET /members", () => {
        it("GET /members without JWT", (done) => {
            // Sends GET request to /members endpoint
            request.get("/members").then((res) => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toMatchObject(responses.rejected.withoutJWT);
            done();
            });
        });
        
        it("GET /members without admin permission", (done) => {
            // Sends GET request to /members endpoint
            request
            .get("/members")
            .set("X-Api-Key", regularUserToken)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toMatchObject(responses.rejected.withoutPermission);
                done();
            });
        });
        
        it("GET /members", (done) => {
            // Sends GET request to /members endpoint
            request
            .get("/members")
            .set("X-Api-Key", adminUserToken)
            .then((res) => {
                console.log(res);
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
      
    //   Post requests

    describe("POST /members", () => {
        it("POST /members without JWT", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
            .send(requests.post.validFormat)
            .then((res) => {
              expect(res.statusCode).toBe(401);
              expect(res.body).toMatchObject(responses.rejected.withoutJWT);
              done();
            });
        });
      
        it("POST /members without admin permission", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
            .set("X-Api-Key", regularUserToken)
            .send(requests.post.validFormat)
            .then((res) => {
              expect(res.statusCode).toBe(401);
              expect(res.body).toMatchObject(responses.rejected.withoutPermission);
              done();
            });
        });
      
        it("POST /members with invalid format (Fields with incorrect data types)", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
            .set("X-Api-Key", adminUserToken)
            .send(requests.post.invalidFormat_1)
            .then((res) => {
              expect(res.statusCode).toBe(400);
              done();
            });
        });
      
        it("POST /members with invalid format (Missing field 'name')", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
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
      
        it("POST /members with invalid format (Missing field 'description')", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
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
      
        it("POST /members with valid format and admin permission", (done) => {
          // Sends POST request to /members endpoint
          request
            .post("/members")
            .set("X-Api-Key", adminUserToken)
            .send(requests.post.validFormat)
            .then((res) => {
              expect(res.statusCode).toBe(200);
              done();
            });
        });
    });

    // Put requests

    describe("PUT /members/:id", () => {
        it("PUT /:id without JWT", (done) => {
          // Sends PUT request to /:id endpoint
          request
            .put("/members/2")
            .send(requests.put.validFormat_1)
            .then((res) => {
              expect(res.statusCode).toBe(401);
              expect(res.body).toMatchObject(responses.rejected.withoutJWT);
              done();
            });
        });
      
        it("PUT /:id without admin permission", (done) => {
          // Sends PUT request to /:id endpoint
          request
            .put("/members/2")
            .set("X-Api-Key", regularUserToken)
            .send(requests.put.validFormat_1)
            .then((res) => {
              expect(res.statusCode).toBe(401);
              expect(res.body).toMatchObject(responses.rejected.withoutPermission);
              done();
            });
        });
      
        it("PUT /:id with invalid format (Fields with incorrect data types)", (done) => {
          // Sends PUT request to :id endpoint
          request
            .put("/members/2")
            .set("X-Api-Key", adminUserToken)
            .send(requests.put.invalidFormat)
            .then((res) => {
              expect(res.statusCode).toBe(400);
              done();
            });
        });
      
        it("PUT /:id with valid format and admin permission", (done) => {
          // Sends PUT request to :id endpoint
          request
            .put("/members/2")
            .set("X-Api-Key", adminUserToken)
            .send(requests.put.validFormat_1)
            .then((res) => {
              expect(res.statusCode).toBe(200);
              expect(res.body).toMatchObject(responses.accepted.put);
              done();
            });
        });
      
        it("PUT /:id updating a single field", (done) => {
          // Sends PUT request to :id endpoint
          request
            .put("/members/2")
            .set("X-Api-Key", adminUserToken)
            .send(requests.put.validFormat_2)
            .then((res) => {
              expect(res.statusCode).toBe(200);
              expect(res.body).toMatchObject(responses.accepted.put);
              done();
            });
        });
    });

    // Delete request

    describe("DELETE /members/:id", () => {
        it("DELETE /members without JWT", (done) => {
            // Sends GET request to /members endpoint
            request.delete("/members/2").then((res) => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toMatchObject(responses.rejected.withoutJWT);
            done();
            });
        });
        
        it("DELETE /members without admin permission", (done) => {
            // Sends GET request to /members endpoint
            request
            .delete("/members/2")
            .set("X-Api-Key", regularUserToken)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toMatchObject(responses.rejected.withoutPermission);
                done();
            });
        });
        
        it("DELETE /members", (done) => {
            // Sends GET request to /members endpoint
            request
            .delete("/members/2")
            .set("X-Api-Key", adminUserToken)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });