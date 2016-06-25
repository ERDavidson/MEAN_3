var appointments = require('./../controllers/appointments.js');	
module.exports = function(app){
	app.get('/appointments', function(req,res){
		appointments.index(req,res);
	});
	app.post('/appointments/create', function(req,res){
		appointments.create(req,res);
	});
	app.post('/appointments/:id/delete', function(req,res){
		appointments.delete(req,res);
	});
};