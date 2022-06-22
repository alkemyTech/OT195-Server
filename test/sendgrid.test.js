const supertest = require("supertest");
const app = require("../app");

const {sendContactEmail , sendSignUpEmail} = require("../helpers/send-emails")

const validEmail = "pierca18@gmail.com"
const invalidEmail = "notAnEmail.com"


describe("sendContactEmail helper function unit tests", () => {
  it("sendContactEmail with invalid Email", async () => {
    expect.assertions(1);
    return sendContactEmail(invalidEmail).catch(e => expect(e).toMatch('Error al enviar el email'));
  });
  it("sendContactEmail with valid Email", async () => {
    await expect(sendContactEmail(validEmail)).resolves.toMatch("Email enviado con éxito a " + validEmail)
  });
});

describe("sendSignUpEmail helper function unit tests", () => {
  it("sendSignUpEmail with invalid Email", async () => {
    expect.assertions(1);
    return sendSignUpEmail(invalidEmail).catch(e => expect(e).toMatch('Error al enviar el email'));
  });
  it("sendSignUpEmail with valid Email", async () => {
    await expect(sendSignUpEmail(validEmail)).resolves.toMatch("Email enviado con éxito a " + validEmail)
  });
});