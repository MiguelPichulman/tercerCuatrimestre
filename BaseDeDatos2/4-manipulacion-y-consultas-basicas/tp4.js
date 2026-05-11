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
                        
                    }                
                },
            }
        }
    }
})