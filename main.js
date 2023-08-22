const form = document.getElementById('form-contatos')
const button = form.querySelector('button')
const inputTell = document.getElementById('numero')
const whatsappIcon = '<img src="images/whatsapp.png" alt="whatsapp"></img>'
const arrayContatos = []
const arrayNumeros = []

let linhas = ''

inputTell.addEventListener('keyup', function(){    
  let regex = /^[0-9]{10,11}$/
  if(regex.test(inputTell.value)){
    inputTell.style.borderColor = 'green'
    button.disabled = false
  } else {
    inputTell.style.borderColor = 'red'
    button.disabled = true
  }
})

form.addEventListener('submit', function(e){
  e.preventDefault()          
  adicionandoLinha()
  atualizaTabela()    
  atualizaRodape()  
})

function adicionandoLinha(){
  const nome = document.getElementById('nome')
  const numero = document.getElementById('numero') 
  if(arrayContatos.includes(nome.value)){
    alert('Contato já cadastrada \nNome: ' + nome.value + '\nTel: ' + numero.value + '\n')  
    nome.value = ''
    numero.value = ''
    nome.focus()
  }else{
    arrayContatos.push(nome.value)
    arrayNumeros.push(numero.value)  
  
    let linha = '<tr>'
    linha += `<td>${nome.value}</td>`
    linha += `<td>${numero.value}</td>`
    linha += `<td><a href="https://api.whatsapp.com/send?phone=${numero.value}&text=Olá, gostaria de saber mais sobre o seu projeto" target="_blank">${whatsappIcon}</a></td>`
    linha += '</tr>'
    linhas += linha 
  }

  nome.value = ''
  numero.value = ''
}

function atualizaTabela(){
  inputTell.style = ''
  let tableBody = document.querySelector('tbody')
  tableBody.innerHTML = linhas
}

function atualizaRodape(){
  let media = arrayContatos.length
  document.getElementById('media').innerHTML = media
  document.getElementById('resultado-media').innerHTML = '<button onclick="salvarContatosTxt()" class="resultado" title="Salvar lista de contatos">Salvar</button>'  
}

function salvarContatosTxt(){
  let text = '';
  for(let i = 0; i < arrayContatos.length; i++){
    text += arrayContatos[i] + ' - ' + arrayNumeros[i] + '\n';
  }
  let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "contacts.txt");
}

function saveAs(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}