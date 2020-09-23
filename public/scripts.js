const Mask = {
  apply(input, func){
    setTimeout(function(){
      input.value = Mask[func](input.value)
    },1)
  },
  formatBRL(value){
    value = value.replace(/\D/g,"")
    return new Intl.NumberFormat('pt-BR', {
      style: "currency",
      currency: "BRL"
    }).format(value/100)
  }
}

const PhotosUpload = {
  uploadLimit: 6,
  handleFileInput(event){
    const {files: fileList } = event.target
    const {uploadLimit} = PhotosUpload
    if(fileList.length > uploadLimit){
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }
    Array.from(fileList).forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)
      }
      reader.readAsDataURL(file)
    })
  }
}

/*
const input = document.querySelector('input[name="price"]')
input.addEventListener("keydown", function(e){
  setTimeout(function(){
    let {value} = e.target
    value = value.replace(/\D/g,"")
    console.log(value)
    value = new Intl.NumberFormat('pt-BR', {
      style: "currency",//1.000,00
      currency: "BRL"
    }).format(value/100)
    e.target.value = value 
  },1)
  //e.target
  //e
})

*/