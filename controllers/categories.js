const { Category } = require('../models')

const createCategory = async(req, res) => {
    const { name, description } = req.body;

    if(!name) {
        return res.status(400).json({msg: "The field 'name' is required", ok: false});
    }

    try {        
        await Category.create({
            name,
            description
        });
        return res.status(200).json({msg: 'Category created successfully', ok: true});
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false });
    }
}

const listCategories = async(req, res) => {
    try {
        const results = await Category.findAll({
            attributes: ['name']
        });
        return res.status(200).json({results, ok: true});
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false });
    }
}

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
    createCategory,
    listCategories,
    updateCategory
}

