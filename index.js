import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import multer from 'multer'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary'
import fs from 'fs'



dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
const app = express()
const PORT = process.env.PORT || 4000

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicFolder = path.join(__dirname, "/uploads")
app.use(express.static(publicFolder))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const upload = multer({dest: 'uploads/'})

/* If you dont want to store the images locally on backend server then */

/* const storage = multer.memoryStorage()
const upload = multer({storage:storage})
 */
/* For multiple images upload */
app.post('/upload', upload.array('images'),async (req, res) =>{
try{

    const imgUrls = []
    req.files.map(async (img, index) =>{
     await cloudinary.v2.uploader.upload(img.path,
        { public_id: img.originalname }, 
         function(error, result) {
          if(error) return console.log('err',error) 
           fs.unlinkSync(img.path)
           imgUrls.push(result.url)
        
    })
    console.log(index, req.files.length)
    if(index === req.files.length - 1)
    {console.log(imgUrls)
    res.json({imgs:imgUrls})
}
    })
    /* res.json({imgs:imgUrls}) */
}
catch(err){
    res.send(err)
}


/* For single image upload */
/* app.post('/upload', upload.single('images'), (req, res) =>{

    console.log(req.file)
    cloudinary.v2.uploader.upload(req.file.path,
  { public_id: req.file.originalname }, 
  function(error, result) {
    if(error) return console.log('err',error) 
    if(result)console.log('result',result,'result')
    fs.unlinkSync(req.file.path)
    res.send(result.url)
});
 */
}) 

connectDB()
app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})