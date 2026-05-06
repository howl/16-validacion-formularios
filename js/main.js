/**
 * Función de ejecución principal.
 */
(() => {
  document.addEventListener('submit', ev => {
    ev.preventDefault();

    const formulario = ev.target;
    let formularioValido = false;

    if (formulario.matches('#formulario1'))
      formularioValido = validarFormulario1(formulario);
    else if (formulario.matches('#formulario2'))
      formularioValido = validarFormulario2(formulario);

    if (formularioValido)
      formulario.submit();
  })
})()

/**
 * Validador del formulario 1.
 * @param {Object} form Un formulario HTML.
 * @param {HTMLInputElement} form.nombre El nombre.
 * @param {HTMLInputElement} form.apellidos Los apellidos.
 * @param {HTMLInputElement} form.edad La edad.
 * @param {HTMlInputElement} form.masculino Si es masculino.
 * @param {HTMLInputElement} form.femenino Si es feminino.
 * @param {HTMLInputElement} form.club True si quiere pertenecer al club, falso en caso contrario.
 * @param {HTMLTextAreaElement} form.sobreTi Autodescripción.
 * @param {HTMLInputElement} form.correo Correo electrónico.
 * @param {HTMLInputElement} form.telefono Teléfono.
 * @returns {Boolean} true si el formulario valida correctamente, false en caso contrario.
 */
const validarFormulario1 = ({ nombre, apellidos, edad, masculino, femenino, club, sobreTi, correo, telefono }) => {
  let correcto = true;
  let cartelError;
  /*
    En la siguiente línea si uso forEach no puedo detenerlo en una iteración concreta con break porque no lo admite.
    Usando some tengo la posibilidad de hacer la la lógica que quiera y en un momento dado retornar true para salir.
    También está la opción de usar every y devolver false para salir poniendo return true al final del bloque de callback.
  */
  [nombre, apellidos, correo, telefono].some(elemento => {
    elemento.classList.remove('error');
    cartelError = elemento.parentElement.lastElementChild;
    cartelError.classList.remove('visible');
    if (!elemento.value.trim()) {
      cartelError.replaceChildren(document.createTextNode(`${capitalizar(elemento.name)} no puede estar vacío.`));
      cartelError.classList.add('visible');
      correcto = false;
    }
  });

  cartelError = masculino.parentNode.lastElementChild;
  cartelError.classList.remove('visible');
  if (!masculino.checked && !femenino.checked) {
    cartelError.replaceChildren(document.createTextNode('Hay que marcar un género.'));
    cartelError.classList.add('visible');
    correcto = false;
  }

  cartelError = edad.parentNode.lastElementChild;
  cartelError.classList.remove('visible');
  if (edad.value < 18) {
    cartelError.replaceChildren(document.createTextNode(`${capitalizar(edad.name)} no puede ser menor de 18.`));
    cartelError.classList.add('visible');
    correcto = false;
  }

  return correcto;
};

const validarFormulario2 = ({ fecha, hora, color, precio, tipo, accesorios, marca }) => {


  return false;
};

/**
 * Dado un String lo devuelve con el primer carácter en mayúscula.
 * @param {String} cadena
 * @returns {String}
 */
const capitalizar = cadena => cadena.charAt(0).toUpperCase() + cadena.slice(1);
