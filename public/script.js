function upload(){

let files=document.getElementById("files").files

let caption=document.getElementById("caption").value

let form=new FormData()

for(let f of files){

form.append("files",f)

}

form.append("caption",caption)

let xhr=new XMLHttpRequest()

xhr.open("POST","/upload")

let start=Date.now()

xhr.upload.onprogress=(e)=>{

let percent=Math.round((e.loaded/e.total)*100)

let time=(Date.now()-start)/1000

let speed=(e.loaded/1024/1024/time).toFixed(2)

document.getElementById("progress").innerHTML="Progress: "+percent+"%"

document.getElementById("speed").innerHTML="Speed: "+speed+" MB/s"

}

xhr.onload=()=>{

let res=JSON.parse(xhr.response)

let html=""

res.links.forEach(l=>{

html+=`<a href="${l}" target="_blank">${l}</a><br>`

})

document.getElementById("links").innerHTML=html

}

xhr.send(form)

}
