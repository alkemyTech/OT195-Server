const {Testimony} = require("../models");

const createTestimony = async(req , res , next) =>{
    try{
        const {name , content} = req.body;
        const image = req.file.filename
        if(!name || name.length < 1){
            return res.status(404).
            json({error:"The field 'name' is required on the request params." ,
            param:"name",
            location:"body" })
        }
        if(!content || content.length < 1){
            return res.status(404).
            json({error:"The field 'content' is required on the request params." ,
            param: "content",
            location: "body" }) ;
        }
        const testimonyCreate = await Testimony.create({
            name,
            content,
            image,
        });
        return res.status(200).send(testimonyCreate);
    }catch(error){
        next(error);
        console.log(error);
        return res.status(500).json({ msg: "internal server error", ok: false });
    }
} 

module.exports = {createTestimony } ; 