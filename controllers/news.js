const { Entry } = require("../models");

const getNewsDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Query
    const entry = await Entry.findOne({
      where: { id: id },
      include: { association: "category", attributes: ["id", "name"] },
    });

    if (!entry) return res.status(404).json({ msg: "Not Found.", ok: false });

    // If the field 'deletedAt' is not null, then the entry is deleted
    if (entry.deletedAt)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    // desestructuring to return only the required fields
    const {
      dataValues: { deletedAt, ...details },
    } = entry;

    return res.json({ results: details, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};


const createNews = async (req, res) => {
  try {
    const entry = await Entry.create({ ...req.body, type: "1" });
    return res.status(201).json({ msg: "News created succesfully", ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

module.exports = {
  getNewsDetails,
  createNews,

};
