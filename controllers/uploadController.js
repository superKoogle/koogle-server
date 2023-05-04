const fsPromises =require("fs").promises
const path = require("path")
const {v4:uuid} = require("uuid")
const upload = async (req, res) =>{
    console.log("here")
    if(!req.file){
        res.status(500).send("No file")
    }
    const file = req.file;
    const folder = path.join(__dirname, "..", "public", "images");
    const filename = `${uuid()}_${req.file.originalname}`;
    const fileUrl  =`${folder}/${filename}`;
    try{
        await fsPromises.writeFile(fileUrl, req.file.buffer);
        console.log("written file")
        return res.json({location: fileUrl, name:filename });

    }catch(err){
        console.log("error. dont be sad, it will be ok!")
        return res.status(500).send("error writing file "+err);
    }
    //res.send("test");
}

module.exports = {upload}