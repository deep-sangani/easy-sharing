const dropzone = document.querySelector(".drop-zone")
const fileinput = document.querySelector("#file-input")
const browsebtn = document.querySelector(".browse-btn")
const bgProgress = document.querySelector(".bg-progress")
const percentcon = document.querySelector("#percent")
const progressContainer = document.querySelector(".progress-container") 
const fileurl =document.querySelector("#fileurl")
const sharingContainer = document.querySelector(".sharing-container")
const copyBtn = document.querySelector("#copy-btn")


const host = ""
const uploadurl= "https://easy-sharing.herokuapp.com/api/files"

dropzone.addEventListener("dragover",(e)=>{
    e.preventDefault()
    if(!dropzone.classList.contains("dragged")){
        dropzone.classList.add("dragged")
    }
  
})

dropzone.addEventListener("dragleave",()=>{
    dropzone.classList.remove("dragged")
})

dropzone.addEventListener("drop",(e)=>{
    e.preventDefault()
    dropzone.classList.remove("dragged")
   
    const files = e.dataTransfer.files
    if(files.length){
        fileinput.files= files
        uploadFile()
    }
  
})
fileinput.addEventListener("change",()=>{
    uploadFile()
})

browsebtn.addEventListener("click",()=>{
    fileinput.click()
})


const uploadFile = ()=>{
    const files = fileinput.files[0]
    const formdata = new FormData()
    formdata.append("myfile",files)
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        showlink(JSON.parse(xhr.response))
      }
    }
xhr.upload.onprogress = updateprogress;


    xhr.open("POST",uploadurl)
    xhr.send(formdata)


}

const updateprogress = (e)=>{
    progressContainer.style.display = "block"
    const percent = Math.round((e.loaded/e.total)*100)

bgProgress.style.width = `${percent}%`;
percentcon.innerText = percent
}


const showlink = ({file})=>{
 progressContainer.style.display = "none"
 sharingContainer.style.display ="block"
 fileurl.value=file
}

copyBtn.addEventListener("click",()=>{
    fileurl.select()
    document.execCommand("copy")
})
