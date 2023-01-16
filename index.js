//Obtencion de todos los elementos que se van a utilizar
const userInput = document.getElementById("user-input");
const resultInput = document.getElementById("user-result");

const copyButton = document.getElementById("copiar");
const encriptarButton = document.getElementById("encriptar");
const desencriptarButton = document.getElementById("desencriptar");

const help = document.getElementById("help-content");

//Objetos con la informacion de encriptacion / desencriptacion
const vocales = {
    a: "enter",
    e: "imes",
    i: "ai",
    o: "ober",
    u: "ufat"
}
const claves = {
    enter: "a",
    imes: "e",
    ai: "i",
    ober: "o",
    ufat: "u"
}
//Quitar las ilustraciones para mostrar el resultado
function showResult() {
    copyButton.classList.remove("reading__copy-button--disable");
    resultInput.classList.remove("reading__read-space--disable");

    help.classList.add("reading__info--disable");
}

//Retornamos un boleano para verificar reglas en el texto
function verifify(userText) {
    //Verificamos que solo haya caracteres en minuscula
    if (/[^a-z\s]/g.test(userText))
        alert("Por favor no utilice mayusculas ni caracteres especiales!");
    //Verificamos que el input no este vacio
    else if (userText.length == 0 || /^[\s]*$/g.test(userText)) {
        userInput.value = "";
        alert("Por favor introduce texto!");
    }
    //true => Todas las reglas se cumplieron
    else return true;
    return false;
}

//Funciones principales
const encriptar = function () {
    const userText = userInput.value;
    const regexRule = /a|e|i|o|u/g;
    const regexMinLength = /\s?[a-z]{15,}\s?/;

    if (verifify(userText)) {
        //Para continuar las palabras deben tener un largo menor a 15
        if (regexMinLength.test(userText)){
            alert("Por favor no utilice palabras demaciado largas (max:15)");
        }
        //Al cumplirse la regla, reemplazamos las vocales por las claves
        else {
            resultInput.textContent = userText.replace(regexRule, param => vocales[param]);
            //Mostramos el resultado en el read-space
            showResult();
        }
    }
}

const desencriptar = function () {
    const userText = userInput.value;
    const regexRule = /enter|imes|ai|ober|ufat/g;

    if (verifify(userText)) {
        //Para continuar el texto debe estar encriptado
        if (regexRule.test(userText)) {
            resultInput.textContent = userText.replace(regexRule, param => claves[param]);
            //Mostramos el resultado en el read-space
            showResult();
        }
        else
            alert("No puedes desencriptar texto no encriptado :P");
    }
}

//Eventos
copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(resultInput.textContent);
        alert("Texto copiado al portapapeles");
    }
    catch{
        alert("La funcion de copiar no esta disponible");
    }
})
encriptarButton.addEventListener("click", encriptar);
desencriptarButton.addEventListener("click", desencriptar);

