db.envios.createIndex({ numero_seguimiento: 1 })

db.envios.createIndex({ciudad_destino: 1, estado: 1})


use logistica_db

db.createCollection("envios")

db.envios.insertMany([
  { numero_seguimiento: 120, estado: "entregado", ciudad_destino: "Mendoza", peso: 25 },
  { numero_seguimiento: 121, estado: "en camino", ciudad_destino: "Córdoba", peso: 15 },
  { numero_seguimiento: 122, estado: "pendiente", ciudad_destino: "San Juan", peso: 5 },
  { numero_seguimiento: 123, estado: "pendiente", ciudad_destino: "San Luis", peso: 28 },
  { numero_seguimiento: 124, estado: "en camino", ciudad_destino: "Cordoba", peso: 13 },
  { numero_seguimiento: 125, estado: "entregado", ciudad_destino: "Tucuman", peso: 10 },
  { numero_seguimiento: 126, estado: "en camino", ciudad_destino: "Salta", peso: 7 },
  { numero_seguimiento: 127, estado: "pendiente", ciudad_destino: "Buenos Aires", peso: 30 },
  { numero_seguimiento: 128, estado: "entregado", ciudad_destino: "Chubut", peso: 35 },
  { numero_seguimiento: 129, estado: "pendiente", ciudad_destino: "Neuquen", peso: 15 }  
])


db.collection.find({ campo: valor }).explain("executionStats")


db.envios.find({ numero_seguimiento: 123 }).explain("executionStats")


db.envios.aggregate([
  { $match: { estado : "entregado" } },
  { $group: { _id: "$ciudad_destino", total: { $sum: 1 } } }
])


db.envios.aggregate([
  { $group: { _id: null, peso_total: { $sum: "$peso" } } }
])

db.envios.aggregate([
  { 
    $project: { 
      _id: 0, 
      estado: 1, 
      numero_seguimiento: { $toUpper: "$numero_seguimiento" } 
    } 
  }
])

db.envios.aggregate([
  {
    $addFields: {
      tipo_carga: {
        $cond: {
          if: { $gt: ["$peso", 20] },
          then: "pesada",
          else: "ligera"
        }
      }
    }
  }
])