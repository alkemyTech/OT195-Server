const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { putImagenColeccion } = require("../controllers/uploads");
const { validateCollections } = require("../helpers/validate-collections");

const { checkValidator } = require("../middlewares/userValidate");
const { validateJWT } = require("../middlewares/validate-JWT");

const coleccionesPermitidas = [
  "users",
  "news",
  "members",
  "public",
  "welcome",
  "slides",
  "testimonies",
  "activities",
];

router.put(
  "/:coleccion/:id",
  [
    validateJWT,
    check("id", "'id' field is required on the request params").notEmpty(),
    check("coleccion").custom((coleccion) =>
      validateCollections(coleccion, coleccionesPermitidas)
    ),
    checkValidator,
  ],
  putImagenColeccion
);

module.exports = router;
