const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("btnAgregar");
const btnActualizar = document.getElementById("btnActualizar");
const lista = document.getElementById("listaTareas");
let tareaEditando = null; 
btnAgregar.addEventListener("click", agregarTarea);
btnActualizar.addEventListener("click", actualizarTarea);

function agregarTarea(){
    const texto = input.value.trim();
    if(texto === ""){
        alert("Por favor escribe una tarea");
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="texto">${texto}</span>
        <div class="botones">
            <button class="editar">
                Editar
            </button>
            <button class="eliminar">
                Eliminar
            </button>
        </div>
    `;

    lista.appendChild(li);
    input.value = "";

    const btnEditar = li.querySelector(".editar");
    const btnEliminar = li.querySelector(".eliminar");

    btnEditar.addEventListener("click", () => {
        input.value = li.querySelector(".texto").textContent;
        tareaEditando = li;
        btnAgregar.style.display = "none";
        btnActualizar.style.display = "inline-block";
    });

    btnEliminar.addEventListener("click", () => {
        li.remove();
    });
}

function actualizarTarea(){
    const nuevoTexto = input.value.trim();
    if(nuevoTexto === ""){
        alert("Escribe una tarea");
        return;
    }
    tareaEditando.querySelector(".texto").textContent = nuevoTexto;
    input.value = "";
    tareaEditando = null;
    btnAgregar.style.display = "inline-block";
    btnActualizar.style.display = "none";
}