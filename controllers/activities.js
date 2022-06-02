const { Activity } = require("../models");

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
};
