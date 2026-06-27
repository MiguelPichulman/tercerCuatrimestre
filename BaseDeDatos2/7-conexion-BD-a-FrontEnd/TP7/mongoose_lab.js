import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/'; 
const dbName = 'laboratorio'; 

// Definicion del Esquema
const componenteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true 
    },
    stock: {
        type: Number 
    }
}, {
    timestamps: true 
});

// Creacion del modelo
const ComponenteModel = mongoose.model('Componente', componenteSchema);

async function main() {
    // Conexión a MongoDB usando Mongoose
    await mongoose.connect(`${url}${dbName}`);
    console.log('Conexión exitosa a MongoDB con Mongoose');

    // Insercion de prueba
    const insertResult = await ComponenteModel.insertMany([ 
        { nombre: 'Placa Arduino UNO', stock: 15 },
        { nombre: 'Resistencia 10k', stock: 100 }
    ]);

    console.log('Componentes insertados =>', insertResult);
    return 'Parte 2: Completado.';
}

try {
    const result = await main();
    console.log(result);
} catch (error) {
    console.error('Error en la conexión o ejecución:', error);
} finally {
    // Cierre de conexion
    await mongoose.connection.close();
}