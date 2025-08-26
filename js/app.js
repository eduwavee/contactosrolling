let agenda = [
  {
    id: 1,
    nombre: "Ana Gómez",
    email: "ana@gmail.com",
    telefono: "3815672316",
    imagen:
      "https://i.pinimg.com/736x/03/18/c0/0318c096dd8382a1aadb05196f491d20.jpg",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "juan@gmail.com",
    telefono: "381123456",
    imagen:
      "https://i.pinimg.com/736x/23/e1/ad/23e1adb4c9618f7f1a322b5d43263691.jpg",
  },
];

const IMAGEN_POR_DEFECTO = "https://via.placeholder.com/150";

const formularioContacto = document.getElementById("formulario-contacto");
const tituloFormulario = document.getElementById("titulo-formulario");
const botonGuardar = document.getElementById("boton-guardar");
const inputIdOculto = document.getElementById("id-contacto-oculto");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const contenedorTabla = document.getElementById("contenedor-tabla");
const mensajeVacio = document.getElementById("mensaje-vacio");
const vistaTabla = document.getElementById("vista-tabla");
const vistaDetalle = document.getElementById("vista-detalle");
const detalleImagen = document.getElementById("detalle-imagen");
const detalleNombre = document.getElementById("detalle-nombre");
const detalleEmail = document.getElementById("detalle-email");
const detalleTelefono = document.getElementById("detalle-telefono");

function renderizarTabla() {
  cuerpoTabla.innerHTML = "";
  if (agenda.length === 0) {
    contenedorTabla.style.display = "none";
    mensajeVacio.style.display = "block";
  } else {
    contenedorTabla.style.display = "block";
    mensajeVacio.style.display = "none";
    agenda.forEach((contacto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td>${contacto.nombre}</td>
          <td>${contacto.email}</td>
          <td>${contacto.telefono}</td>
          <td>
            <button class="editar" onclick="editarContacto(${contacto.id})">Editar</button>
            <button class="borrar" onclick="borrarContacto(${contacto.id})">Borrar</button>
            <button class="ver" onclick="verDetalle(${contacto.id})">Ver más</button>
          </td>
        `;
      cuerpoTabla.appendChild(fila);
    });
  }
}

function borrarContacto(idContacto) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, bórralo",
  }).then((result) => {
    if (result.isConfirmed) {
      agenda = agenda.filter((contacto) => contacto.id !== idContacto);
      renderizarTabla();
      Swal.fire("¡Borrado!", "El contacto ha sido eliminado.", "success");
    }
  });
}

function editarContacto(idContacto) {
  const contactoAEditar = agenda.find((contacto) => contacto.id === idContacto);
  if (contactoAEditar) {
    tituloFormulario.textContent = "Editar Contacto";
    botonGuardar.textContent = "Guardar Cambios";
    inputIdOculto.value = contactoAEditar.id;

    document.getElementById("nombre").value = contactoAEditar.nombre;
    document.getElementById("email").value = contactoAEditar.email;
    document.getElementById("telefono").value = contactoAEditar.telefono;
    document.getElementById("url-imagen").value = contactoAEditar.imagen;

    vistaTabla.style.display = "block";
    vistaDetalle.style.display = "none";
  }
}

function verDetalle(idContacto) {
  const contacto = agenda.find((c) => c.id === idContacto);
  if (contacto) {
    detalleImagen.src = contacto.imagen;
    detalleNombre.textContent = contacto.nombre;
    detalleEmail.textContent = contacto.email;
    detalleTelefono.textContent = contacto.telefono;

    vistaTabla.style.display = "none";
    vistaDetalle.style.display = "block";
  }
}

function volverALaLista() {
  vistaDetalle.style.display = "none";
  vistaTabla.style.display = "block";
  renderizarTabla();
}

formularioContacto.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const urlImagen = document.getElementById("url-imagen").value.trim();

  if (nombre === "" || email === "") {
    Swal.fire({
      icon: "error",
      title: "¡Error!",
      text: "Por favor, completa los campos de nombre y email.",
    });
    return;
  }

  const id = inputIdOculto.value;
  const imagenFinal = urlImagen === "" ? IMAGEN_POR_DEFECTO : urlImagen;

  if (id) {
    const index = agenda.findIndex((c) => c.id == id);
    if (index !== -1) {
      agenda[index].nombre = nombre;
      agenda[index].email = email;
      agenda[index].telefono = telefono;
      agenda[index].imagen = imagenFinal;
    }
    Swal.fire({
      icon: "success",
      title: "¡Contacto modificado!",
      text: "Los cambios se han guardado con éxito.",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const nuevoId =
      agenda.length > 0 ? Math.max(...agenda.map((c) => c.id)) + 1 : 1;
    const nuevoContacto = {
      id: nuevoId,
      nombre: nombre,
      email: email,
      telefono: telefono,
      imagen: imagenFinal,
    };
    agenda.push(nuevoContacto);
    Swal.fire({
      icon: "success",
      title: "¡Contacto creado!",
      text: "El nuevo contacto se ha añadido a la lista.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  renderizarTabla();
  formularioContacto.reset();
  tituloFormulario.textContent = "Agregar Contacto";
  botonGuardar.textContent = "Guardar Contacto";
  inputIdOculto.value = "";
});

document.addEventListener("DOMContentLoaded", renderizarTabla);
