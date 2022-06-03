const { Activity } = require("../models");

const putActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, image, content } = req.body;

    const activity = await Activity.findOne({ where: { id } });

    if (!activity)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    if (activity.deletedAt)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    activity.set({
      name,
      image,
      content,
    });

    await activity.save();

    return res
      .status(200)
      .json({ results: { msg: "Activity updated successfully.", ok: true } });
  } catch (err) {
    console.log(err);
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    return res
      .status(201)
      .json({ msg: "Activity created succesfully", ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

module.exports = {
  createActivity,
  putActivity,
};
