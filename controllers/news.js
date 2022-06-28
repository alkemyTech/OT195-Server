const { Entry } = require("../models");

const getNewsDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Query
    const entry = await Entry.findOne({
      where: { id },
      include: { association: "category", attributes: ["id", "name"] },
    });

    if (!entry) return res.status(404).json({ msg: "Not Found.", ok: false });

    // If the field 'deletedAt' is not null, then the entry is deleted
    if (entry.deletedAt)
      return res.status(404).json({ msg: "Not Found.", ok: false });

    // desestructuring to return only the required fields
    const { dataValues } = entry;

    return res.status(200).json({ results: dataValues, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const deleteNew = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findOne({ where: { id } });

    if (!entry) return res.status(404).json({ msg: "Not found.", ok: false });

    if (entry.deletedAt)
      return res.status(404).json({ msg: "Not found.", ok: false });

    // // This record will be soft deleted even though I'm using the destroy method thanks to the 'paranoid' parameter on the model definition
    await entry.destroy();

    return res
      .status(200)
      .json({ results: { msg: "New deleted successfully." }, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const createNews = async (req, res) => {
  // Fields required only to avoid unhandled exceptions
  const { name, content, categoryId } = req.body;
  const newEntry = {
    name,
    content,
    categoryId,
    type: "1",
  };
  try {
    const entryCreated = await Entry.create(newEntry);
    return res.status(201).json({ results: entryCreated, ok: true });
  } catch (err) {
    if ((err.errno = 1452)) {
      return res.status(500).json({
        msg: "Param 'categoryId' doesn't match any category.",
        ok: false,
      });
    }

    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const getNewsList = async (req, res) => {
  try {
    const results = await Entry.findAll({
      attributes: ["id", "name", "image", "content", "createdAt"],
      where: { deletedAt: null },
    });

    if (!results) return res.status(404).json({ msg: "Not Found.", ok: false });

    res.status(200).json({ results, ok: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, ok: false });
  }
};

const modifyNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, content, image } = req.body;
    const allNews = await Entry.findAll();

    const idNews = allNews.find((el) => el.id.toString() === id.toLowerCase());

    if (idNews) {
      idNews.name = name ? name : idNews.name;
      idNews.content = content ? content : idNews.content;
      idNews.image = image ? image : idNews.image;
      idNews.save();
      return res.status(200).json({ results: idNews, ok: true });
    }
    return res.status(404).json({ msg: "Not Found.", ok: false });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

module.exports = {
  getNewsDetails,
  createNews,
  getNewsList,
  modifyNews,
  deleteNew,
};