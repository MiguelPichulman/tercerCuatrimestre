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
                libro:
                {
                    bsonType:"object",
                    required:["titulo", "autor", "isbn"],
                    properties:
                    {
                        titulo:{bsonType:"string"},
                        autor:{bsonType:"string"},
                        isbn:{bsonType:"string"}
                    },
                },
                usuario:
                {
                    bsonType:"object",
                    required:["nombre","dni","email"],
                    properties:
                    {
                        nombre:{bsonType:"string"},
                        dni:{bsonType:"number"},
                        email:{bsonType:"string"}
                    }
                },
                fecha_prestamo:{bsonType:"date"},
                fecha_devolucion:{bsonType:"date"},
                estado:{enum:["activo", "devuelto", "retrasado"]}
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
    disponible:false,
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
    titulo:"Libro 4",
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
db.prestamos.insertMany([
    {
        libro:{
            titulo:"Libro 1",
            autor:"Cosme Fulanito",
            isbn:"123456"
        },
        usuario:{
            nombre:"Joaquin Rodriguez",
            dni:12345678,
            email:"joaco@mail.com"
        },
        fecha_prestamo: new Date("2026-05-01T10:00:00Z"),
        fecha_devolucion:new Date("2026-05-14T10:00:00Z"),
        estado:"activo"
    },
    {
        libro:{
            titulo:"Libro 5",
            autor:"Cosme Fulanito",
            isbn:"123460"
        },
        usuario:{
            nombre:"Martin Perez",
            dni:23456789,
            email:"tincho@mail.com"
        },
        fecha_prestamo: new Date("2026-05-05T10:00:00Z"),
        fecha_devolucion:new Date("2026-05-10T10:00:00Z"),
        estado:"devuelto" 
    },
    {
         libro:{
            titulo:"Libro 4",
            autor:"Cosme Fulanito",
            isbn:"123459"
        },
        usuario:{
            nombre:"Miguel Angel",
            dni:12456789,
            email:"miguelito@mail.com"
        },
        fecha_prestamo: new Date("2026-05-01T10:00:00Z"),
        fecha_devolucion:new Date("2026-05-11T10:00:00Z"),
        estado:"retrasado"
    }
])

//- Consultar libros disponibles
db.libros.find({disponible:true})

//- Actualizar estado de un préstamo
db.prestamos.updateOne(
    {"usuario.email":"joaco@mail.com"},
    {$set:{estado:"retrasado"}}
)

//- Buscar préstamos atrasados
db.prestamos.find({estado:"retrasado"})

//- Agregar categoría a un libro con $addToSet

db.libros.updateOne(
    {"titulo":"Libro 1"},
    {$addToSet:{categorias:"suspenso"}}
)