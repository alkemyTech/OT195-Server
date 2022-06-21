const {Testimony} = require("../models");

const cloudinary = require("cloudinary").v2; // traigo cloudinary
cloudinary.config(process.env.CLOUDINARY_URL); // configuro cloudinary con la key que tengo en .env



const createTestimony = async(req , res , next) =>{
    try{
        const {name , content } = req.body;
        console.log(req.body);
        console.log(req.files)
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
        let image 
        if(req.files){
            const { tempFilePath } = req.files.image; // para usar req.files instalo la libreria "express-fileupload" , traigo por destruturing tempFilePath
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath); // subo la imagen a cloudinary
            image = secure_url
        }
        const testimonyCreate = await Testimony.create({
            name,
            content,
            image,
        });
        return res.status(200).json({testimonyCreate , ok:true});
    }catch(error){
        next(error);
        console.log(error);
        return res.status(500).json({ msg: "internal server error", ok: false });
    }
}

const modifyTestimony = async(req , res , next) =>{
    try{
        const {id} = req.params;
        const {name , content} = req.body;
        const idTestimony = await Testimony.findOne({
            where:{id}
        });
        let image 
        if(req.files){
            const { tempFilePath } = req.files.image; // para usar req.files instalo la libreria "express-fileupload"
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
            image = secure_url
        }
        if(idTestimony){
            // Se limpian las imagenes previas que tenia el modelo
            if(idTestimony.image && req.files){ // si tiene una imagen y si viene algo por req.files , va eleminar la imagen previa 
                const nombreArr = idTestimony.image.split("/");
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split(".");
                console.log(public_id)
                cloudinary.uploader.destroy(public_id , function(error,result) {
                    console.log(result, error) });
            }
            idTestimony.name = name ? name : idTestimony.name;
            idTestimony.content = content ? content : idTestimony.content;
            idTestimony.image = image ? image : idTestimony.image;
            idTestimony.save();
            return res.status(200).json({ idTestimony, ok: true })
        }
        return res.status(404).json({ error: "no se encuntra ese id", ok:false });
    }catch(error){
        next(error);
        console.log(error);
        return res.status(500).json({ msg: "internal server error", ok: false })
    }
}

const allTestimonies = async(req,res , next)=>{
    try{
        const testimonies = await Testimony.findAll();
        return res.status(200).json({results: testimonies , ok:true})
    }catch(error){
        next(error)
        console.log(error);
        return res.status(500).json({msg:"internal server error" , ok:false })
    }
}

const deletedTestimony = async (req, res , next) =>{
    try{
        const {id} = req.params;
        const idTestimony = await Testimony.findOne({
            where:{id}
        });
        if(!idTestimony){
            return res.status(404).json({error:"No se encuentra id" , ok:false});
        }
        if(idTestimony.image){
            //elemino la imagen de la data base de Cloudinary
            const nombreArr = idTestimony.image.split("/");
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id , function(error,result) {
                console.log(result, error) });
        }
        await idTestimony.destroy();
        return res.status(200).json({msg:"New deleted successfully", ok:true} );
    }catch(error){
        console.log(error);
        next(error);
        return res.status(500).json({msg:"internal server error" , ok:false})
    }
}


//detail the testimony
const detailTestimonies = async(req , res , next) =>{
    try{
        const {id} = req.params;
        const idTestimony = await Testimony.findOne({
            where:{id}
        });
        if(!idTestimony){
            return res.status(404).json({error:"No se encuentra id" , ok:false});
        }
        return res.status(200).json({result:idTestimony , ok:true});
    }catch(error){
        console.log(error);
        next(error);
        return res.status(500).json({msg:"internal server error" , ok:false})
    }
}

module.exports = {createTestimony , modifyTestimony , allTestimonies, deletedTestimony, detailTestimonies} ; 