db.createCollection("libros",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["titulo", "autor", "isbn", "anio_publicacion", "disponible"],
            properties:{
                titulo:{bsonType:"string"},
                autor:{bsonType:"string"},
                isbn:{bsonType:"string",
                        pattern:"[0-9]"
                },
                anio_publicacion:{
                    bsonType:"int",
                    minimum:1900,
                    maximum:2025
                },
                disponible:{bsonType:"bool"},
                categorias:{bsonType:"array",
                    minItems:1,
                    items:{bsonType:"string"}
                }
            }
        }
    }
})

db.createCollection("prestamos",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["libro", "usuario", "fecha_prestamo", "fecha_devolucion", "estado"],
            properties:{
                libro:{
                    bsonType:"object",
                    required:["titulo", "autor", "isbn"],
                    properties:{
                        titulo:{bsonType:"string"},
                        autor:{bsonType:"string"},
                        isbn:{bsonType:"string"}
                    },
                },
                usuario:{
                    bsonType:"object",
                    required:["nombre","dni","email"],
                    properties:{
                        nombre:{bsonType:"string"},
                        dni:{bsonType:"number"},
                        email:{bsonType:"string"}
                    },
                fecha_prestamo:{bsonType:"date"},
                fecha_devolucion:{bsonType:"date"},
                estado:{enum:["activo", "devuelto", "retrasado"]}
                }
            }
        }
    }
})
/*Operaciones a realizar:*/
//- Insertar 5 libros
db.libros.insertMany([
    {
    titulo:"Libro 1",
    autor:"Cosme Fulanito",
    isbn:"123456",
    anio_publicacion:1901,
    disponible:true,
    categorias:["ciencia ficcion", "policial"]
    },
    {
    titulo:"Libro 2",
    autor:"Zutano Diaz",
    isbn:"123457",
    anio_publicacion:1902,
    disponible:false,
    categorias:["romantico", "drama"]
    },
    {
    titulo:"Libro 3",
    autor:"Pepe Mengano",
    isbn:"123458",
    anio_publicacion:1903,
    disponible:true,
    categorias:["accion", "policial"]
    },
    {
    titulo:"Luis Perez",
    autor:"Cosme Fulanito",
    isbn:"123459",
    anio_publicacion:1904,
    disponible:false,
    categorias:["obra teatral", "humor"]
    },
    {
    titulo:"Libro 5",
    autor:"A.B.C.",
    isbn:"123460",
    anio_publicacion:1905,
    disponible:true,
    categorias:["novela"]
    }
])

//- Insertar 3 préstamos
//- Consultar libros disponibles
//- Actualizar estado de un préstamo
//- Buscar préstamos atrasados
//- Agregar categoría a un libro con $addToSet


