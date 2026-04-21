function procesarUsuario(nombre, callback){
    console.log("Procesando Usuario:", nombre)
    callback();
}
procesarUsuario("Ana", ()=>{
    console.log("Usuario procesado con exito");
})

//Otro ejemplo

function buscarUsuario(id, callback){
    const usuarios=[
        {id:1, nombre:"Ana"},
        {id:2, nombre:"Luis"}
    ]


setTimeout(()=>{
    const usuario = usuarios.find((u)=> u.id === id);

    if(usuario){
        callback(null, usuario);
    }else{
        callback("Usuario no encontrado", null);
    }
},1000);
}

buscarUsuario(1,(error, usuario)=>{
    if(error){
        console.log("Error: ", error);
    }else{
        console.log("Usuario encontrado: ", usuario.nombre)
    }
})


//encadenando promesas - funciones que devuelven promesas
function pedirPizza() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("¡Pizza lista!");
    }, 2000); // Simula 2 segundos para preparar la pizza
  });
}
function pedirBebida() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("¡Bebida entregada!");
    }, 1000); // Simula 1 segundo para entregar la bebida
  });
}
function pedirPostre() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("¡Postre servido!");
    }, 1500); // Simula 1.5 segundos para servir el postre
  });
}

pedirPizza()
    .then((pizza)=>{
        console.log(pizza)
        return pedirBebida();
    })
    .then((bebida)=>{
        console.log(bebida)
        return pedirPostre();
    })
    .then((postre)=>{
        console.log(postre)
        console.groupCollapsed("Todo el pedido esta listo para servir");
    })
    .catch((error)=>{
        console.log("Hubo un error con el pedido", error);
    })

   
   
    // Ejemplo Real: Peticiones HTTP
// Usando promesas
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        console.log('Usuarios:', data);
        // Procesar datos aquí
    })
    .catch(err => {
        console.error('Error:', err);
    });

// Usando Async/Await
async function cargarUsuarios() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        console.log('Usuarios:', data);
        // Procesar datos aquí
    } catch (err) {
        console.error('Error:', err);
    }
}
cargarUsuarios();