import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/'; // String de conexión local
const dbName = 'odm-test'; // Nombre de la base de datos

// Definición del esquema
const exampleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		indexedDB: true
	},
	age: {
		type: Number,
		required: true
	},
}, {
	timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

// Creación del modelo (equivalente a una colección)
const ExampleModel = mongoose.model('documents', exampleSchema);

async function main() {
	// Conexión a MongoDB usando Mongoose
	await mongoose.connect(`${url}${dbName}`);
	console.log('Conexión exitosa a MongoDB con Mongoose');

	const insertResult = await ExampleModel.insertMany([ // Esta sintaxis depende de Mongoose pero suele ser muy parecida
		{ name: 'Ana', age: 28 },
		{ name: 'Luis', age: 34 },
		{ name: 'María', age: 22 },
	]);

	console.log('Documentos insertados =>', insertResult);

	return 'Completado.';
}

try {
	const result = await main();
	console.log(result);
} catch (error) {
	console.error('Error en la conexión o ejecución:', error);
} finally {
	// Cierre de conexión
	await mongoose.connection.close();
}
