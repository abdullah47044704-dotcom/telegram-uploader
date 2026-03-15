const express = require("express")
const multer = require("multer")
const axios = require("axios")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const FormData = require("form-data")

const app = express()

app.use(cors())
app.use(express.static("public"))
app.use("/uploads", express.static("uploads"))

const BOT_TOKEN = "8725202010:AAGADFmY-zFP-VUWza8EQ0lMoTovMxF4bPs"
const CHAT_ID = "-1003720603417"

const storage = multer.diskStorage({
 destination: "uploads/",
 filename: (req,file,cb)=>{
  cb(null,Date.now()+"-"+file.originalname)
 }
})

const upload = multer({storage})

app.post("/upload", upload.array("files",5), async(req,res)=>{

 const caption = req.body.caption || "New Upload"

 let links = []

 for(const file of req.files){

  const form = new FormData()

  form.append("chat_id",CHAT_ID)
  form.append("caption",caption)
  form.append("document",fs.createReadStream(file.path))

  await axios.post(
   `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
   form,
   {headers:form.getHeaders()}
  )

  const link = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`

  links.push(link)

 }

 res.json({links})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
 console.log("Server running")
})
