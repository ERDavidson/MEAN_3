var mongoose = require('mongoose');
var Appointment = mongoose.model("Appointment");
//var moment = require('moment');
//moment().format();
module.exports = {
	index: function(req,res){
		Appointment.find({}, function(err, appointment_list){
			if(err){
				console.log("Error retrieving appointment index");
			} else {
				for (index in appointment_list){
					if (appointment_list[index].date < Date.now()){
						appointment_list.splice(index, 1);
					}
				}
				res.json({appointment_list: appointment_list});
			}
		})
	},
	create: function(req,res){
		console.log("server controller create activated");
		new_appointment = new Appointment({patient: req.body.patient, date: req.body.datetime, complaint: req.body.complaint});
		console.log("saved date: " + new_appointment.date);
		console.log("time:" + new_appointment.date.toTimeString());
		var errors = [];
		current_appts = Appointment.find({date: new_appointment.date.toLocaleDateString()}, function(err, appointment_list){
			if (appointment_list.length > 2){
				errors.push("error: That day is full.  Please schedule your appointment for a different day.");
			}
		})
		if (new_appointment.date.toTimeString().substring(0,2) < '08'){
			errors.push("error: Appointment cannot be before 8:00 AM");
		}
		if (new_appointment.date.toTimeString().substring(0,2) > '16'){
			errors.push("error: Appointment cannot be after 5:00 PM");
		}
		if (new_appointment.date < Date.now()){
			errors.push("error: Appointment cannot be in the past.");
			console.log(errors + "This appointment is in the past.");
		} else {
			new_appointment.save(function(err){
				if (err){
					console.log("Error saving new appointment");
				}
			})
		}
		res.json({errors: errors});
	},
	delete: function(req,res){
		Appointment.findOne({_id: req.params.id}).remove(function(err){
			if (err){
				console.log("Error deleting appointment");
			} else {
				Appointment.find({}, function(err, appointment_list){
					res.json({appointment_list: appointment_list});
				})
			}
		})
	}
}