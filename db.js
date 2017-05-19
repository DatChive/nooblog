const config = require('./config')

// Bring Mongoose into the app
const mongoose = require('mongoose')

// Create the database connection
export function connectDB() {
	return mongoose.connect(config.databaseURI, null, (err) => {
		if (err) {
			console.log('MongoDB connection error: ' + err)
			process.exit(0);
		}
	})
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to ' + config.databaseURI)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	console.log('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose default connection disconnected through app termination')
		process.exit(0)
	})
})

// Load Schemas/Models
require('./models/post')
