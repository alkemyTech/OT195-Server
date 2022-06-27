const {
  User,
  Entry,
  Member,
  Public,
  Slide,
  Testimony,
  Activity,
} = require("../models");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const putImagenColeccion = async (req, res) => {
  const { id, coleccion } = req.params;

  try {
    let modelo;
    switch (coleccion) {
      case "activities":
        modelo = await Activity.findOne({ where: { id, deletedAt: null } });
        if (!modelo) {
          return res.status(400).json({
            msg: `Activity not found.`,
          });
        }
        break;
      case "users":
        modelo = await User.findOne({ where: { id, deletedAt: null } });
        if (!modelo) {
          return res.status(400).json({
            msg: `User not found.`,
          });
        }
        break;
      case "news":
        modelo = await Entry.findOne({ where: { id, deletedAt: null } });
        if (!modelo) {
          return res.status(400).json({
            msg: `Entry not found.`,
          });
        }
        break;
      case "members":
        modelo = await Member.findOne({ where: { id, deletedAt: null } });
        if (!modelo) {
          return res.status(400).json({
            msg: `Member not found.`,
          });
        }
        break;
      case "public":
        modelo = await Public.findOne({ where: {id} });
        if (!modelo) {
          return res.status(400).json({
            msg: `Public not found.`,
          });
        }
        break;
      case "welcome":
        modelo = await Public.findOne({ where: {id} });
        if (!modelo) {
          return res.status(400).json({
            msg: `Public not found.`,
          });
        }
        break;
      case "slides":
        modelo = await Slide.findOne({ where: { id, deletedAt: null } });
        if (!modelo) {
          return res.status(400).json({
            msg: `Slide not found.`,
          });
        }
        break;
      case "testimonies":
        modelo = await Testimony.findOne({
          where: {
            id,
            //  deletedAt: null
          },
        });
        if (!modelo) {
          return res.status(400).json({
            msg: `Testimony not found.`,
          });
        }
        break;
      default:
        return res.status(500).json({ msg: "Internal Server Error"});
    }

    // Se limpian las imagenes previas que tenia el modelo
    let imageColumn = modelo.image
    if(coleccion === "welcome"){imageColumn= modelo.welcomeImage}

    if (imageColumn) {
      const nombreArr = imageColumn.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    // Se guarda la imagen en la nube
    const { tempFilePath } = req.files.image; // para usar req.files instalo la libreria "express-fileupload"
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    coleccion !== "welcome"? modelo.image = secure_url: modelo.welcomeImage = secure_url

    await modelo.save();

    return res.status(200).json({ msg: "Imagen subida correctamente." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  putImagenColeccion,
};
