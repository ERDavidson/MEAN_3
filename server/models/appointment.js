var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AppointmentSchema = new mongoose.Schema({
	patient: String,
	complaint: String,
	date: Date,
},
{
	timestamps: true
});
AppointmentSchema.path('patient').required(true, "Appointment must have a patient.");
AppointmentSchema.path('complaint').required(true, "Please describe the reason for your visit.");
AppointmentSchema.path('date').required(true, "Please select a date and time for your appointment.");
mongoose.model('Appointment', AppointmentSchema);