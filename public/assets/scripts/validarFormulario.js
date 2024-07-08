function validarFormulario(event, textinp = [], selects = [], radios = []) {

    let continuar = true

    textinp.forEach(elemento => {
        if (continuar) {
            let valor = document.getElementById(elemento).value
            if (valor === '') {
                alert(`El atributo "${elemento}" no puede estar vacío`)
                event.preventDefault();
                continuar = false
            }
        }
    })

    if (!continuar) {
        return continuar
    }

    selects.forEach(elemento => {
        if (continuar) {
            const checkboxes = document.querySelectorAll(`#${elemento} input[type="checkbox"]`)
            const someMarked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (!someMarked) {
                alert(`Al menos un elemento de "${elemento}" debe estar marcado`)
                event.preventDefault();
                continuar = false
            }
        }
    })

    if (!continuar) {
        return continuar
    }

    radios.forEach(elemento => {
        if (continuar) {
            const radios = document.querySelectorAll(`#${elemento} input[type="radio"]`);
            const someMarked = Array.from(radios).some(radio => radio.checked);

            if (!someMarked) {
                alert(`Al menos un elemento de "${elemento}" debe estar marcado`)
                event.preventDefault();
                continuar = false
            }
        }
    })

    return continuar
}

function validarDelete(event) {
    const resultado = confirm("¿Quieres continuar?");

    if (!resultado) {
        event.preventDefault();
    } 
}