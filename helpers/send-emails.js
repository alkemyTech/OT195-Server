const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailPlaceholder = "edgardo9000@gmail.com";

const sendContactEmail = (email = "") => {
  const message = {
    to: email,
    from: emailPlaceholder,
    subject: "¡Gracias por contactarte con Somos Más!",
    text: "Gracias por ponerse en contacto con nosotros y por su interés en Somos Mas. Me pondré en contacto de nuevo tan pronto como tenga una respuesta a su consulta.Que tenga un buen dia",
  };

  return new Promise(async (resolve, reject) => {
    try {
      await sgMail.send(message);
      resolve("Email enviado con éxito a " + email);
    } catch (err) {
      reject("Error al enviar el email");
    }
  });
};

const sendSignUpEmail = (email = "") => {
  const message = {
    to: email,
    from: emailPlaceholder,
    subject: "Registro exitoso en Somos Más",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto animi natus quidem sed repellat minus tenetur impedit",
  };

  return new Promise(async (resolve, reject) => {
    try {
      await sgMail.send(message);
      resolve("Email enviado con éxito a " + email);
    } catch (err) {
      console.log(err.response.body);
      reject("Error al enviar el email");
    }
  });
};

module.exports = {
  sendContactEmail,
  sendSignUpEmail,
};
