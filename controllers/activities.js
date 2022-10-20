const { Activity } = require("../models");
const cloudinary = require("cloudinary").v2; // traigo cloudinary

const putActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, content } = req.body;

    const activity = await Activity.findOne({ where: { id } });

    if (!activity)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    if (activity.deletedAt)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    activity.set({
      name,
      content,
    });

    await activity.save();

    return res
      .status(200)
      .json({ results: { msg: "Activity updated successfully." }, ok: true });
  } catch (err) {
    console.log(err);
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    return res.status(201).json({
      results: activity,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const getActivities = async (req, res) => {
  try {
    const results = await Activity.findAll({ where: { deletedAt: null } });

    return res.json({ results, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findOne({ where: { deletedAt: null, id } });

    if (!activity) return res.status(404).json({ msg: "Not found", ok: false });

    return res.json({ results: activity, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const deletedActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const idAcitivity= await Activity.findOne({
      where: { id },
    });
    console.log(idAcitivity)
    if (!idAcitivity) {
      return res.status(404).json({ error: "No se encuentra id", ok: false });
    }
    if (idAcitivity.image) {
      //elemino la imagen de la data base de Cloudinary
      const nombreArr = idAcitivity.image.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id, function (error, result) {
        console.log(result, error);
      });
    }
    await idAcitivity.destroy();
    return res.status(200).json({ msg: "New deleted successfully", ok: true });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ msg: "internal server error", ok: false });
  }
};

module.exports = {
  createActivity,
  putActivity,
  getActivities,
  getActivityById,
  deletedActivity,
};
