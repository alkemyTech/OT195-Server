const { Category } = require("../models");

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByPk(id);

    if (category && !category.deletedAt) {
      await category.update({
        name,
        description,
      });
      await category.save();
      return res.status(200).json({ category, ok: true });
    }
    return res.status(404).json({ error: "Category not found.", ok: false });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

module.exports = {
  updateCategory,
};
