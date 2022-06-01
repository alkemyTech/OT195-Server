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

const getNewsList = async(req, res) => {
  try {
    const entries = await Entry.findAll({
      attributes: ['name', 'image', 'createdAt']
    });
    res.status(200).json({entries, ok: true});
  } catch (error) {
    res.status(400).json({msg:error.message, ok: false});
  }
}

const modifyNews = async(req , res , next ) =>{
  try{
    const {id} = req.params;
    const {
      name,
      content,
      image, 
    } = req.body;
    const allNews = await Entry.findAll()
    // console.log(allNews)
    const idNews = allNews.find(el => el.id.toString() === id.toLowerCase() );
    if(idNews){
      console.log(idNews)
      idNews.name = name ? name : idNews.name;
      idNews.content = content ? content : idNews.content;
      idNews.image = image ? image : idNews.image;
      idNews.save(); 
      return res.status(200).send(idNews);
    }
    return res.status(404).json({error:"no se encuntra ese id" });
  }catch(error){
    console.log(error);
    next(error);
    return res.status(500).json({ msg:"internal server error" , ok:false } )
  }
}

module.exports = {
  getNewsDetails,
  createNews,
  getNewsList,
  modifyNews
};
