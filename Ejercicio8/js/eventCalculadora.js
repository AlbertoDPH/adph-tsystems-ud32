// Obtenemos todos los botones de la calculadora
const botones = $("button");

// Obtenemos la pantalla de la calculadora
const pantalla = $("#pantalla");

// Funcion para realizar las operaciones básicas
function realizarOperacion(valor1, valor2, operacion) {
    let resultado = 0;

    switch (operacion) {
        case "+":
            resultado = parseFloat(valor1) + parseFloat(valor2);
            break;
        case "-":
            resultado = parseFloat(valor1) - parseFloat(valor2);
            break;
        case "*":
            resultado = parseFloat(valor1) * parseFloat(valor2);
            break;
        case "/":
            resultado = parseFloat(valor1) / parseFloat(valor2);
            break;
        default:
            resultado = 0;
    }

    return resultado;
}

// Funcion para controlar los eventos de los botones
function eventosBoton(event) {
    const boton = $(this);

    if (!isNaN(boton.text())) {
        // Es numero
        if (pantalla.val() === "0") {
            pantalla.val(boton.text());
        } else {
            pantalla.val(pantalla.val() + boton.text());
        }
    } else if (boton.text() === "+" || boton.text() === "-" || boton.text() === "*" || boton.text() === "/") {

        // Es una operacion basica
        if (pantalla.val() !== "0") {
            pantalla.val(pantalla.val() + " " + boton.text() + " ");
        }
    } else {
        switch (boton.text()) {
            case "R":
                pantalla.val(pantalla.val().slice(0, -1));
                break;
            case "CE":
                pantalla.val(" DESHABILITADO ");
                break;
            case "C":
                pantalla.val("0");
                break;
            case ",":
                if (!pantalla.val().includes(".")) {
                    pantalla.val(pantalla.val() + ".");
                }
                break;
            case "=":
                let operandos = pantalla.val().split(" ");
                if (operandos.length === 3) {
                    let resultado = realizarOperacion(operandos[0], operandos[2], operandos[1]);
                    pantalla.val(resultado.toString());
                }
                break;
        }
    }
}

// Agrega el evento 'click' a todos los botones
botones.on("click", eventosBoton);

// Muestra '0' al cargar la pagina
pantalla.val("0");
