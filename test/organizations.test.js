const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("GET /organizations/1/public", () => {
  describe("Organization data", () => {
    test("The returned data contains the organization's name", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.name).toEqual("Somos Más");
    }, 100000);

    test("The returned data contains the organization's logo", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.image).toEqual("/images/logo.png");
    }, 100000);

    test("The returned data contains the organization's phone", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.phone).toEqual(1160112988);
    }, 100000);

    test("The returned data contains the organization's address", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.address).toEqual("");
    }, 100000);

    test("The returned data contains the organization's email", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.email).toEqual(
        "somosfundacionmas@gmail.com"
      );
    }, 100000);
  });
  describe("Web data", () => {
    test("The returned data contains the welcome title", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.welcomeTitle).toEqual("Hola! Bienvenidx");
    }, 100000);

    test("The returned data contains the welcome text", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.welcomeText).toEqual(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dignissim ac et eleifend lacus, rhoncus, dignissim sagittis. Tellus ac a, elementum ut. Tellus a morbi tincidunt ultricies malesuada eget turpis. Lacus enim non enim, velit hac turpis interdum arcu. Suspendisse at vel ultrices amet orci enim lectus porttitor ut."
      );
    }, 100000);

    test("The returned data contains the organization's social media links", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.socialMedia).toHaveLength(3);
      expect(response.body.results.socialMedia[0].url).toContain(
        "www.facebook.com/AlkemyLATAM/"
      );
      expect(response.body.results.socialMedia[1].url).toContain(
        "www.instagram.com/alkemy__/"
      );
      expect(response.body.results.socialMedia[2].url).toContain(
        "https://www.linkedin.com/company/alkemy2020/?originalSubdomain=arwww.instagram.com/alkemy__/"
      );
    }, 100000);

    test("The returned data contains the nav items", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.nav.items).toHaveLength(6);
      expect(response.body.results.nav.items[0].route).toContain("/home");
      expect(response.body.results.nav.items[1].route).toContain("/staff");
      expect(response.body.results.nav.items[2].route).toContain("/news");
      expect(response.body.results.nav.items[3].route).toContain(
        "/testimonials"
      );
      expect(response.body.results.nav.items[4].route).toContain("/contact");
      expect(response.body.results.nav.items[5].route).toContain("/contribute");
    }, 100000);

    test("The returned data contains the nav buttons", async () => {
      const response = await api
        .get("/organizations/1/public")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.results.nav.buttons).toHaveLength(5);
      expect(response.body.results.nav.buttons[0].route).toContain("/login");
      expect(response.body.results.nav.buttons[1].route).toContain("/signup");
      expect(response.body.results.nav.buttons[2].route).toContain(
        "/backoffice"
      );
      expect(response.body.results.nav.buttons[3].route).toContain("/profile");
      expect(response.body.results.nav.buttons[4].route).toContain("/signup");
    }, 100000);
  });
});
