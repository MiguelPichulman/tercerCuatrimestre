import { MongoClient } from 'mongodb'; // Importamos el driver nativo 

// 1. Tu string de conexión a MongoDB Atlas [cite: 383]
//const url = 'mongodb+srv://joacol23:utnjoaco123@tpidb.2yeanuh.mongodb.net/'; 
// Reemplaza tu string de conexión por el del profesor:
//const url = 'mongodb+srv://miguel123:coloquio2@tpidb.2yeanuh.mongodb.net/?appName=TPIDB';
const url = 'mongodb://profes4:utncom4@ac-d57kwbp-shard-00-00.2yeanuh.mongodb.net:27017,ac-d57kwbp-shard-00-01.2yeanuh.mongodb.net:27017,ac-d57kwbp-shard-00-02.2yeanuh.mongodb.net:27017/LoginTPI?ssl=true&authSource=admin&retryWrites=true&w=majority';
const client = new MongoClient(url); // Instanciamos el cliente [cite: 448]

// 2. El nombre de tu base de datos 
const dbName = 'LoginTPI'; 

async function main() {
  // Conectamos al servidor de Atlas [cite: 451]
  await client.connect(); 
  console.log('¡Conexión exitosa al servidor MongoDB Atlas!'); // [cite: 452]

  // Seleccionamos la base de datos [cite: 453]
  const db = client.db(dbName); 

  // Accedemos a tu colección 'usuario' [cite: 60, 454]
  const collection = db.collection('usuario'); 
  
  // A modo de prueba, traemos todos los usuarios en lugar de insertar nuevos
  const usuarios = await collection.find({}).toArray(); 
  console.log('Usuarios encontrados:', usuarios);

  return 'Prueba de conexión completada.'; // [cite: 457]
}

// Ejecución principal con manejo de errores
try { // [cite: 458]
  const result = await main(); // [cite: 459]
  console.log(result); // [cite: 460]
} catch (error) { // [cite: 461]
  console.error('Error en la conexión con MongoDB Atlas:', error); // [cite: 462]
} finally { // [cite: 463]
  // Cerramos la conexión siempre al finalizar [cite: 465]
  await client.close(); 
}