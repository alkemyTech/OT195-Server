const jwt = require("jsonwebtoken");

// Method expect to recieve an user object with the following properties: firstName, lastName, roleId, image, id
const generateJWT = (user = {}) => {
  return new Promise((resolve, reject) => {
    // User data will be stored in the payload as shown below

    /* 
    payload: {
        user{
          id: '',
          firstName: '',
          lastName: '',
          roleId: '',
          image: '',
        }
    }
    */

    const payload = { user };

    // JSON Web Token signature
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      // Signing Callback
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Unable to generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
