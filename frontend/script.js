const API = "http://localhost:3000/vehiculos";
let vehiculoEditando = null;
const form =
document.getElementById("vehiculoForm");

form.addEventListener("submit", guardarVehiculo);

async function guardarVehiculo(e){

    e.preventDefault();

    const vehiculo = {

        codigo:
        document.getElementById("codigo").value,

        marca:
        document.getElementById("marca").value,

        modelo:
        document.getElementById("modelo").value,

        anio:
        document.getElementById("anio").value,

        color:
        document.getElementById("color").value,

        combustible:
        document.getElementById("combustible").value,

        precio:
        document.getElementById("precio").value,

        cantidad:
        document.getElementById("cantidad").value,

        descripcion:
        document.getElementById("descripcion").value
    };

    if(vehiculoEditando){

        await fetch(
            `${API}/${vehiculoEditando}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(
                    vehiculo
                )
            }
        );

        vehiculoEditando = null;

        document.querySelector(
            "button"
        ).textContent =
        "Guardar Vehículo";

    }else{

        await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(vehiculo)
        });
    }

    form.reset();

    cargarVehiculos();
}

async function cargarVehiculos(){

    const respuesta =
    await fetch(API);

    const datos =
    await respuesta.json();

    let html = "";

    datos.forEach(v=>{

        html += `
        <tr>

        <td>${v.id}</td>
        <td>${v.codigo}</td>
        <td>${v.marca}</td>
        <td>${v.modelo}</td>
        <td>${v.precio}</td>

       <td>

<button
class="btn btn-warning btn-sm"
onclick="editarVehiculo(${v.id})">

Editar

</button>

<button
class="btn btn-danger btn-sm"
onclick="eliminarVehiculo(${v.id})">

Eliminar

</button>

</td>

        </tr>
        `;
    });

    document.getElementById(
        "tablaVehiculos"
    ).innerHTML = html;
}

async function eliminarVehiculo(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    cargarVehiculos();
}

async function editarVehiculo(id){

    const respuesta =
    await fetch(API);

    const vehiculos =
    await respuesta.json();

    const vehiculo =
    vehiculos.find(v=>v.id===id);

    vehiculoEditando=id;

    document.getElementById("codigo")
        .value=vehiculo.codigo;

    document.getElementById("marca")
        .value=vehiculo.marca;

    document.getElementById("modelo")
        .value=vehiculo.modelo;

    document.getElementById("anio")
        .value=vehiculo.anio;

    document.getElementById("color")
        .value=vehiculo.color;

    document.getElementById("combustible")
        .value=vehiculo.combustible;

    document.getElementById("precio")
        .value=vehiculo.precio;

    document.getElementById("cantidad")
        .value=vehiculo.cantidad;

    document.getElementById("descripcion")
        .value=vehiculo.descripcion;

    document.querySelector("button")
        .textContent =
        "Actualizar Vehículo";
}
cargarVehiculos();