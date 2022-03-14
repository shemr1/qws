import mongoose from "mongoose";
import validator from "validator";

const patientSchema = mongoose.Schema({
	name: {
		type: String,
	},

	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, "Please enter valid email address"],
	},
	ref: { type: String, required: true },

	dateOfBirth: Date,
	allergies: [String],
	Injuries: [String],
});

export default mongoose.models.Patient ||
	mongoose.model("Patient", patientSchema);
