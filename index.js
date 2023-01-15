//Obtencion de todos los elementos que se van a utilizar
const userInput = document.getElementById("user-input");
const resultInput = document.getElementById("user-result");

const copyButton = document.getElementById("copiar");
const encriptarButton = document.getElementById("encriptar");
const desencriptarButton = document.getElementById("desencriptar");

const help = document.getElementById("help-content");

//Objetos con la informacion de encriptacion / desencriptacion
const vocales = {
    a:"enter",
    e:"imes",
    i:"ai",
    o:"ober",
    u:"ufat"
}
const claves = {
    enter:"a",
    imes:"e",
    ai:"i",
    ober:"o",
    ufat:"u"
}
//Quitar las ilustraciones y mostrar el resultado
function showResult(){
    copyButton.classList.remove("reading__copy-button--disable");
    help.classList.add("reading__info--disable");
    resultInput.classList.remove("reading__read-space--disable");
    
}
//Verifica algunas reglas textuales
function verifify(userText){
    if(/[^a-z\s]/g.test(userText))
        alert("Por favor no utilice mayusculas ni caracteres especiales!");
    else if(userText.length == 0 || /^[\s]*$/g.test(userText)){
        userInput.value = "";
        alert("Por favor introduce texto!");
    }
    else return true;
    return false;
}
//Funciones principales
const encriptar = function(){
    const userText = userInput.value;

    if(verifify(userText)){
        //Para continuar las palabras deben tener un largo menor a 15
        if(/\s?[a-z]{15,}\s?/.test(userText))
            alert("Por favor no utilice palabras demaciado largas (max:15)");
        else{
        //Al cumplirse las reglas, mostramos el resultado
        resultInput.textContent = userText.replace(/a|e|i|o|u/g , param => vocales[param]);
        showResult();
        }
    }
}
const desencriptar = function(){
    const userText = userInput.value;
    if(verifify(userText)){
        resultInput.textContent = userText.replace(/enter|imes|ai|ober|ufat/g , param => claves[param]);
        showResult();
    }
}
copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(resultInput.textContent);
    alert("Texto copiado al portapapeles");
})
//Eventos
encriptarButton.addEventListener("click" , encriptar);
desencriptarButton.addEventListener("click" , desencriptar);

