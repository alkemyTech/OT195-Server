const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const adminUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJlbWFpbCI6ImZlbGltaWNoYWxza2lAaWNsb3VkLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHUxMWx4Tk5LTTVQYzk1QlNhaFF1aE9RTW03eWQybFk0cWsvSksyWmFhR1A4NzhyREt5eEhDIiwicm9sZUlkIjoxLCJmaXJzdE5hbWUiOiJGZWxpcGUiLCJsYXN0TmFtZSI6Ik1pY2hhbHNraSIsImRlbGV0ZWRBdCI6bnVsbCwiaW1hZ2UiOm51bGx9LCJpYXQiOjE2NTU4NjkyMTYsImV4cCI6MTY2MzY0NTIxNn0.LyBi0sjbbENPgY83IEYsnc5jUBlyel5ON-bNW4ULVy8"

const regularUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZmlyc3ROYW1lIjoiVXN1YXJpbyIsImxhc3ROYW1lIjoiUHJ1ZWJhIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkMzBZYy95TzEyV2J5d2tncVpZWC5SZThSMkIwSlBiL0p6c2gyNEtkbjFqQzZnN1JuZkFkODYiLCJyb2xlSWQiOjIsInVwZGF0ZWRBdCI6IjIwMjItMDYtMjJUMDM6Mzk6MTcuOTg0WiIsImNyZWF0ZWRBdCI6IjIwMjItMDYtMjJUMDM6Mzk6MTcuOTg0WiJ9LCJpYXQiOjE2NTU4NjkxNTgsImV4cCI6MTY2MzY0NTE1OH0.2wVXlOeaUPuGz61yUIObASTICHmNWLmC0uxdlFACbx0"

const createRequestParams = {
    invalid: [
        {
            name: "Example"
        },
        {
            name: "Example",
            content: "Example"
        },
        {
            name: "Example",
            content: "Example",
            image: "Example"
        },
        {
            name: "Example",
            content: "Example",
            image: "Example",
            categoryId: "hi"
        },
        {
            name: "Example",
            content: "Example",
            image: "Example",
            categoryId: 3
        }
    ],
    valid: {
        name: "Example",
        content: "Example",
        image: "Example",
        categoryId: 1
    }
}

describe('GET /news', () => {
    test('The returned data is not empty', async() => {
        const response = await request
            .get("/news")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        
        expect(response.body.results).toBeDefined();
        expect(response.body.results.length > 0).toBeTruthy();
    });
})

describe('GET /news/:id', () => {
    test('The returned data is not empty', async() => {
        const response = await request.get("/news/1")
            .expect("Content-Type", /application\/json/);
        expect(response.body.results).toBeDefined();
    });
    
    test("The param 'id' doesn't match any new", async() => {
        const response = await request
            .get("/news/2000")
            .expect(404)
            .expect("Content-Type", /application\/json/);
        
        expect(response.body.msg).toEqual('Not Found.');
    });
    
    test("The param 'id' is invalid", async() => {
        const response = await request
            .get("/news/aisdcds")
            .expect(404)
            .expect("Content-Type", /application\/json/);
        
        expect(response.body.msg).toEqual('Not Found.');
    });
})

describe('DELETE /news/:id', () => {
    test("Petition without jwt", async() => {
        const response = await request
            .delete('/news/delete/2')
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('An API key is required in the request header.');
    })    

    test("Petition without admin permissions", async() => {
        const response = await request
            .delete('/news/delete/2')
            .set("X-Api-Key", regularUserToken)
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Access denied');
    })

    test("The param 'id' doesn't match any new", async() => {
        const response = await request
            .delete("/news/delete/2000")
            .set("X-Api-Key", adminUserToken)
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Not found.');
    });
    
    test("The param 'id' is invalid", async() => {
        const response = await request
            .delete("/news/delete/aisdcds")
            .set("X-Api-Key", adminUserToken)
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Not found.');
    });

    test("Delete successfully", async() => {
        const response = await request
            .delete("/news/delete/3")
            .set("X-Api-Key", adminUserToken)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body.results.msg).toEqual('New deleted successfully.');
    })
})

describe('POST /news', () => {
    test("Petition without jwt", async() => {
        const response = await request
            .post('/news')
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('An API key is required in the request header.');
    })    

    test("Petition without admin permissions", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", regularUserToken)
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Access denied');
    })

    test("Petition without 'name' param", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual("The field 'name' is required on the request params.");
    })
    
    test("Petition without 'content' param", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .send(createRequestParams.invalid[0])
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual("The field 'content' is required on the request params.");
    })
    
    test("Petition without 'image' param", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .send(createRequestParams.invalid[1])
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual("The field 'image' is required on the request params.");
    })
    
    test("Petition with invalid 'categoryId' param", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .send(createRequestParams.invalid[3])
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual("The field 'categoryId' must be a number.");
    })

    test("Petition with non-existent 'categoryId'", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .send(createRequestParams.invalid[4])
            .expect(500)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual("Param 'categoryId' doesn't match any category.");
    })
    
    test("Petition with all params is successfully", async() => {
        const response = await request
            .post('/news')
            .set("X-Api-Key", adminUserToken)
            .send(createRequestParams.valid)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(response.body.results.msg).toEqual("News created succesfully");
    })
})

describe('PUT /news/:id', () => {
    test("Petition without jwt", async() => {
        const response = await request
            .put('/news/modify/1')
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('An API key is required in the request header.');
    })    

    test("Petition without admin permissions", async() => {
        const response = await request
            .put('/news/modify/1')
            .set("X-Api-Key", regularUserToken)
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Access denied');
    })

    test("The param 'id' doesn't match any new", async() => {
        const response = await request
            .put("/news/modify/2000")
            .set("X-Api-Key", adminUserToken)
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Not Found.');
    });
    
    test("The param 'id' is invalid", async() => {
        const response = await request
            .put("/news/modify/aisdcds")
            .set("X-Api-Key", adminUserToken)
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(response.body.msg).toEqual('Not Found.');
    });

    test("Petition with valid 'id' is successfully", async() => {
        const response = await request
            .put("/news/modify/1")
            .set("X-Api-Key", adminUserToken)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(typeof response.body.results).toBe('object');
        expect(typeof response.body.results.name).toBeDefined();
        expect(typeof response.body.results.content).toBeDefined();
        expect(typeof response.body.results.image).toBeDefined();
    })
})