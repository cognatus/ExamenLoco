
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

var base = require('./moduls/DB');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//puede que la use
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Conexión a Mongoose.
mongoose.connect('mongodb://localhost/DB', function(error){

	if(error){

		throw error; 

	}else{

		console.log('Estas super bato crazy party mirrey loco conectado a la DB');

	}
});

//manda las colecciones a routes
routes.constructor(base);

//rutas GET
app.get('/', routes.index);
app.get('/principal', routes.principal);
app.get('/insercion', routes.insercion);
app.get('/consulta', routes.consulta);
app.get('/morir', routes.morir);



//rutas para mongo
app.post('/inicia', routes.inicia);
app.post('/inserta', routes.inserta);
app.post('/modifica', routes.modifica);

//start el server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server escuchando en port ' + app.get('port'));
});
