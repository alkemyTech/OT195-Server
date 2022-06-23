const { Testimony } = require("../models");

const cloudinary = require("cloudinary").v2; // traigo cloudinary
cloudinary.config(process.env.CLOUDINARY_URL); // configuro cloudinary con la key que tengo en .env

const createTestimony = async (req, res, next) => {
  const { name, content } = req.body;

  try {
    // let image = null;

    // if (req.files) {
    //   const { tempFilePath } = req.files.image; // para usar req.files instalo la libreria "express-fileupload" , traigo por destruturing tempFilePath
    //   const { secure_url } = await cloudinary.uploader.upload(tempFilePath); // subo la imagen a cloudinary
    //   image = secure_url;
    // }

    const testimonyCreate = await Testimony.create({
      name,
      content,
    });
    return res.status(201).json({ results: testimonyCreate, ok: true });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

const modifyTestimony = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    const testimony = await Testimony.findOne({
      where: { id },
    });

    if (!testimony)
      return res.status(404).json({ msg: "Not found", ok: false });

    testimony.set({
      name,
      content,
    });

    await testimony.save();

    return res
      .status(200)
      .json({ msg: "Testimony updated successfully", ok: true });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

const allTestimonies = async (req, res, next) => {
  try {
    const testimonies = await Testimony.findAll();
    return res.status(200).json({ results: testimonies, ok: true });
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

const deletedTestimony = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idTestimony = await Testimony.findOne({
      where: { id },
    });
    if (!idTestimony) {
      return res.status(404).json({ error: "No se encuentra id", ok: false });
    }
    if (idTestimony.image) {
      //elemino la imagen de la data base de Cloudinary
      const nombreArr = idTestimony.image.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id, function (error, result) {
        console.log(result, error);
      });
    }
    await idTestimony.destroy();
    return res.status(200).json({ msg: "New deleted successfully", ok: true });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

const detailTestimonies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idTestimony = await Testimony.findOne({
      where: { id },
    });
    if (!idTestimony) {
      return res.status(404).json({ error: "No se encuentra id", ok: false });
    }
    return res.status(200).json({ result: idTestimony, ok: true });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

module.exports = {
  createTestimony,
  modifyTestimony,
  allTestimonies,
  deletedTestimony,
  detailTestimonies,
};
