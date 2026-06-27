import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/'; 
const client = new MongoClient(url);
const dbName = 'laboratorio'; // Conectando a la base de datos solicitada 

async function main() {
    await client.connect();
    console.log('Conexión exitosa al servidor MongoDB (Driver Nativo)');
    const db = client.db(dbName); 
    const collection = db.collection('sensores');

    // Carga de array con tres sensores de robótica 
    const insertResult = await collection.insertMany([
        { tipo: 'Sensor de Humedad' },
        { tipo: 'Servo Motor' },
        { tipo: 'LED RGB' }
    ]);
    
    console.log('Sensores insertados =>', insertResult);
    return 'Parte 1: Completado.';
}

try {
    const result = await main();
    console.log(result);
} catch (error) {
    console.error('Error en la conexión con MongoDB:', error);
} finally {
    await client.close();
}