async function upload(){

const files=document.getElementById("files").files
const caption=document.getElementById("caption").value

const form=new FormData()

for(let f of files){

form.append("files",f)

}

form.append("caption",caption)

const xhr=new XMLHttpRequest()

xhr.open("POST","/upload")

xhr.upload.onprogress=(e)=>{

let percent=Math.round((e.loaded/e.total)*100)

document.getElementById("progress").innerHTML=
"Uploading: "+percent+"%"

}

xhr.onload=()=>{

const res=JSON.parse(xhr.response)

let html=""

res.links.forEach(l=>{

html+=`<a href="${l}" target="_blank">${l}</a><br>`

})

document.getElementById("links").innerHTML=html

}

xhr.send(form)

}
