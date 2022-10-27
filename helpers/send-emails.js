const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailPlaceholder = "edgardo9000@gmail.com";

const sendContactEmail = (email = "" , name) => {
  const message = {
    to: email,
    from: emailPlaceholder,
    subject: `¡Gracias ${name} por contactarse con Somos Más!`,
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


const sendPortfolioEmail = (email , name) =>{
  const message = {
    to:email , 
    from: emailPlaceholder,
    subject: `Gracias ${name} por contactarse!`,
    text:"Gracias por ponerse en contacto conmigo y por su tiempo en ver mi portfolio. Me pondre en contacto con usted de nuevo lo mas pronto posible. Que tenga un buen dia"
  }
  return new Promise(async(resolve , reject) =>{
    try{
      await sgMail.send(message);
      resolve("Email enviado con éxito a " + email);
    }catch (err) {
      reject("Error al enviar el email");
    }
  });
}

//funcion echa con sengrid para mi portfolio 
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
  sendPortfolioEmail,
  sendSignUpEmail,
};
