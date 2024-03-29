document.addEventListener('DOMContentLoaded', function () {

    //se agrega funcion rendir
    const btnRendirse = document.getElementById("btnRendirse");
    btnRendirse.addEventListener('click', resolverJuego);

    //se agrega funcion reiniciar
    const btnReiniciar = document.getElementById("btnReiniciar");
    btnReiniciar.addEventListener('click', reiniciarSudoku);

    const tablaSudoku = document.getElementById("tabla-sudoku");
    const tamano = 9;

    for (let fila = 0; fila < tamano; fila++) {
        const nuevaFila = document.createElement("tr");
        for (let col = 0; col < tamano; col++) {
            const celda = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "celda";
            input.id = `celda-${fila}-${col}`; 

            input.addEventListener('input', function(event){
                validarEntrada(event,fila,col)
            });

            celda.appendChild(input);
            nuevaFila.appendChild(celda);
        }
        tablaSudoku.appendChild(nuevaFila);
    }

    function reiniciarSudoku(){
        for(let fila = 0 ; fila < tamano; fila++){
            for(let col = 0; col < tamano; col++){
                const celdaId = `celda-${fila}-${col}`;
                const celda = document.getElementById(celdaId);
                celda.value = "";
                celda.classList.remove("resolverEfecto", "entradaUsuario")
            }
        }
    }

});

async function resolverJuego() {
    const tamano = 9;
    const listaSudoku = [];

    // Se llenan los valores del Sudoku desde el input
    for (let fila = 0; fila < tamano; fila++) {
        listaSudoku[fila] = [];
        for (let col = 0; col < tamano; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celdaValor = document.getElementById(celdaId).value;
            listaSudoku[fila][col] = celdaValor !== "" ? parseInt(celdaValor) : 0;
        }
    }

    // Se identifican las celdas ingresadas por el usuario
    for (let fila = 0; fila < tamano; fila++) {
        for (let col = 0; col < tamano; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaId);

            if (listaSudoku[fila][col] !== 0) {
                celda.classList.add("entradaUsuario");
            }
        }
    }

    // Se resuelve el Sudoku y se muestra la solución
    if (sudoku(listaSudoku)) {
        for (let fila = 0; fila < tamano; fila++) {
            for (let col = 0; col < tamano; col++) {
                const celdaId = `celda-${fila}-${col}`;
                const celda = document.getElementById(celdaId);

                if (!celda.classList.contains("entradaUsuario")) {
                    celda.value = listaSudoku[fila][col];
                    celda.classList.add("resolverEfecto");
                    await efectoRetraso(20);
                }
            }
        }
    } else {
        alert("¡El Sudoku no tiene solución!");
    }
}

function sudoku(tablero) {
    const tamano = 9;
    for (let fila = 0; fila < tamano; fila++) {
        for (let col = 0; col < tamano; col++) {
            if (tablero[fila][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (verificaConflictos(tablero, fila, col, num)) {
                        tablero[fila][col] = num;

                        if (sudoku(tablero)) {
                            return true;
                        }
                        tablero[fila][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function verificaConflictos(tablero, fila, col, num) {
    const tamano = 9;

    for (let i = 0; i < tamano; i++) {
        if (tablero[fila][i] === num || tablero[i][col] === num) {
            return false;
        }
    }

    const filaInicio = Math.floor(fila / 3) * 3;
    const colInicio = Math.floor(col / 3) * 3;

    for (let i = filaInicio; i < filaInicio + 3; i++) {
        for (let j = colInicio; j < colInicio + 3; j++) {
            if (tablero[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function efectoRetraso(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validarEntrada(event, fila, col) {
    const celdaId = `celda-${fila}-${col}`;
    const celda = document.getElementById(celdaId);
    const valor = celda.value;

    if (!/^[1-9]$/.test(valor)) {
        // El número ingresado no es válido, mostrar mensaje y limpiar celda
        Swal.fire({
            icon: "warning",
            title: `El número (${valor}) no es válido. Por favor ingrese un valor del (1-9)`,
            showConfirmButton: false,
            timer: 2500
        });
        celda.value = ""; // Limpiar el valor de la celda
        return;
    }

    const numeroIngresado = parseInt(valor);

    // Verificar si el número ya existe en la fila
    for (let i = 0; i < 9; i++) {
        if (i !== col && document.getElementById(`celda-${fila}-${i}`).value == numeroIngresado) {
            Swal.fire({
                icon: "warning",
                title: `El número (${numeroIngresado}) ya existe en la fila`,
                showConfirmButton: false,
                timer: 2500
            });
            celda.value = ""; // Limpiar el valor de la celda
            return;
        }
    }

    // Verificar si el número ya existe en la columna
    for (let i = 0; i < 9; i++) {
        if (i !== fila && document.getElementById(`celda-${i}-${col}`).value == numeroIngresado) {
            Swal.fire({
                icon: "warning",
                title: `El número (${numeroIngresado}) ya existe en la columna`,
                showConfirmButton: false,
                timer: 2500
            });
            celda.value = ""; // Limpiar el valor de la celda
            return;
        }
    }

    //verficiar subcuadricula 3x3
    const subcuadriculaFilaInicio = Math.floor(fila /3)*3;
    const subcuadriculaColInicio = Math.floor(col/3)*3;

    for(let i = subcuadriculaFilaInicio; i <subcuadriculaFilaInicio + 3; i++ ){
        for(let i = subcuadriculaColInicio; i <subcuadriculaColInicio + 3; i++ ){
            if(i !== fila & j !== col && document.getElementById(`celda-${i}-${col}`).value == numeroIngresado){
                Swal.fire({
                    icon: "warning",
                    title: `El número (${numeroIngresado}) ya existe en la subcuadricula`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }
    }
}
