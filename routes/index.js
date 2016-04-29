//Spanglish on

var db;//variable para uso de la DB

//inicializar el module and tenerlo here para su use
exports.constructor = function(dvd){
	db = dvd;
};

/*
 * GET
 */

exports.index = function(req, res){
	res.render('index', {title: 'Inicio'});
};

exports.insercion = function(req, res){
	res.render('insercion', {title: 'Inserta'});
};

exports.principal = function(req, res){
	res.render('Principal', {title: 'Principal',
							 datos: req.session.datos});
};

exports.consulta = function(req, res){
	consulta(req, res);
	res.render('consulta', {title: 'Principal',
							 datos: req.session.datos,
							 amigos: req.session.amigos});
};

/*
 * Cosas Mongo
 */
 //inicio sesion
exports.inicia = function(req, res){
	
	db.find({ _id: req.body.user, pass: req.body.pass }, function(error, documento){
		if( !error && documento[0]!=undefined ){
			req.session.datos = documento;
			res.redirect('/principal');
		}else{
			res.redirect('/')
		}
	});
}

//nuevo usuario
exports.inserta = function(req, res){

	var datos = new db({
				_id: 	req.body.user,
				pass: 	req.body.pass,
				some: 	req.body.some
	})
	
	datos.save( function(error, documento){
		if( !error ){
			res.redirect('/principal');
		}
	});
}

//consulta info
function consulta (req, res){

	db.find({}, function(error, documento){
		if( !error && documento[0] != undefined ){
			console.log(documento)
			req.session.amigos = documento;
		}
	});
}

//modifica info
exports.modifica = function(req, res){

	db.update({_id: req.session.datos[0]._id},{
			$set:{

				_id: 	req.body.user,
				pass: 	req.body.pass,
				some: 	req.body.some 	
					
			}
		}, function(error, documento){
			if(!error){
				req.session.datos[0]._id = req.body.user;
				req.session.datos[0].pass = req.body.pass;
				req.session.datos[0].some = req.body.some;
				res.redirect('/principal');
			}
	});
};

exports.morir = function(req, res){
	db.remove({_id: req.session.datos[0]._id}, function(error, documento){
		if(!error){
			console.
			req.session.datos = null;
			res.redirect('/')
		}
	})
};
//Spanglish off