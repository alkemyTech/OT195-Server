const { User} = require('../models');

const adminValidate = async (req, res, next)=>{
    try {
        const comprobation = await User.findOne({
            where: {id: req.user.id, roleId:1}
        });
        if(comprobation !== null){
            next();
        }else{
            res.status(401).json({msg: "Access denied", ok:false});
        }
    } catch (error) {
        res.status(500).json({msg: "Server error. Please, try again later", ok:false});
    }
}

module.exports = {adminValidate}