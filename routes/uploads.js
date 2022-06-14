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
  "slides",
  "testimonies",
  "activities",
];

router.put(
  "/:coleccion/:id",
  [
    validateJWT,
    check("id", "El id debe de ser de mongo").notEmpty(),
    check("coleccion").custom((coleccion) =>
      validateCollections(coleccion, coleccionesPermitidas)
    ),
    checkValidator,
  ],
  putImagenColeccion
);

module.exports = router;
