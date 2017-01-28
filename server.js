// Babel ES6/JSX Compiler
require('babel-register')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const favicon = require('serve-favicon')
const logger = require('morgan')
const async = require('async')
const colors = require('colors')
const request = require('request')
const React = require('react')
const ReactDOM = require('react-dom/server')
const Router = require('react-router')
const swig = require('swig')
const xml2js = require('xml2js')
const _ = require('underscore')
const db = require('./db')

const config = require('./config')
const routes = require('./app/routes')

const app = express()

const posts = require('./app/routes/postRoutes')

// attempt to connect the DB
db.connectDB()

app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', posts)

app.use((req, res) => {
	Router.match({ routes: routes.default, location: req.url },
		(err, redirectLocation, renderProps) => {
			if (err) {
				res.status(500).send(err.message)
			} else if (redirectLocation) {
				res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
			} else if (renderProps) {
				const html = ReactDOM.renderToString(
					React.createElement(Router.RoutingContext, renderProps))
				const page = swig.renderFile('views/index.html', { html: html })
				res.status(200).send(page)
			} else {
				res.status(404).send('Page Not Found')
			}
		})
})

app.use((err, req, res, next) => {
	console.log(err.stack.red)
	res.status(err.status || 500)
	res.send({ message: err.message })
})

/**
 * Socket.io stuff.
 */
const server = require('http').createServer(app)
const io = require('socket.io')(server)
let connections = 0

io.sockets.on('connection', (socket) => {
	connections++
	io.sockets.emit('connections', { connections: connections })
	socket.on('disconnect', () => {
		connections--
		io.sockets.emit('connections', { connections: connections })
	})
})

server.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'))
})
