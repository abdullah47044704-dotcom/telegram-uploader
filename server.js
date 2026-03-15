const express = require("express")
const multer = require("multer")
const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")

const app = express()

app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))

const BOT_TOKEN="8725202010:AAGADFmY-zFP-VUWza8EQ0lMoTovMxF4bPs"
const CHAT_ID="-1003720603417"

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})

app.post("/upload", upload.array("files",5), async (req,res)=>{

let caption=req.body.caption || "New Upload"

let links=[]

for(let file of req.files){

let link=`${req.protocol}://${req.get("host")}/uploads/${file.filename}`

let form=new FormData()

form.append("chat_id",CHAT_ID)

form.append("caption",
caption +
"\n\n⬇ Download Link:\n" +
link
)

form.append("video",fs.createReadStream(file.path))

await axios.post(
`https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`,
form,
{headers:form.getHeaders()}
)

links.push(link)

}

res.json({links})

})

const PORT=process.env.PORT||3000

app.listen(PORT)
