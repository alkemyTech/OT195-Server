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
            attributes: ['id','name','description']
        });
        return res.status(200).json({results, ok: true});
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findOne({ where: { id } });
  
      if (!category) return res.status(404).json({ msg: "Not found.", ok: false });
  
      if (category.deletedAt)
        return res.status(404).json({ msg: "Not found.", ok: false });
  
        await category.destroy();
  
        return res
        .status(200)
        .json({ results: { msg: "Category deleted successfully." }, ok: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error.", ok: false });
    }
  };

module.exports = {
    createCategory,
    deleteCategory,
    listCategories
}