function validarFormulario(textinp = [], selects = [], radios = []) {

    textinp.forEach(elemento => {
      let valor = document.getElementById(elemento).value
      if (valor === '') {
        alert(`El atributo "${elemento}" no puede estar vacío`)
        event.preventDefault();
      }
    })

    selects.forEach(elemento => {
      const checkboxes = document.querySelectorAll(`#${elemento} input[type="checkbox"]`)
      const someMarked = Array.from(checkboxes).some(checkbox => checkbox.checked);

      if (!someMarked) {
        alert(`Al menos un elemento de "${elemento}" debe estar marcado`)
        event.preventDefault();
      }
    })

    radios.forEach(elemento => {
      const radios = document.querySelectorAll(`#${elemento} input[type="radio"]`);
      const someMarked = Array.from(radios).some(radio => radio.checked);

      if (!someMarked) {
        alert(`Al menos un elemento de "${elemento}" debe estar marcado`)
        event.preventDefault();
      }
    })
  }