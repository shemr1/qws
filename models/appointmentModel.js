import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = mongoose.Schema({
	patientID: { type: String, required: true },
	patient: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate: [validator.isEmail, "Please enter valid email address"],
	},
	contact: { type: String },
	date: { type: Date },
	time: { type: String },
	status: { type: String, required: true },
	doctorID: { type: String },
	doctor: { type: String },
	service: { type: String },
	reason: { type: String, required: true },
});

export default mongoose.models.Appointment ||
	mongoose.model("Appointment", appointmentSchema);
