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
        return res.status(200).json({msg: 'Category created successfully', ok: true})
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false });
    }
}

module.exports = {
    createCategory
}