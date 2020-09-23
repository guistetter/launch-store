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