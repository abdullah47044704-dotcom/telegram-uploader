async function upload(){

const files = document.getElementById("files").files

const form = new FormData()

for(let file of files){

form.append("files",file)

}

const res = await fetch("/upload",{

method:"POST",
body:form

})

const data = await res.json()

let html=""

data.links.forEach(link=>{

html += `<p><a href="${link}" target="_blank">${link}</a></p>`

})

document.getElementById("links").innerHTML=html

}