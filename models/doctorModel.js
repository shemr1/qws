import mongoose from "mongoose";
import validator from "validator";

const doctorSchema = mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, "Please enter valid email address"],
	},
	speciality: String,
	ref: { type: String, required: true },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
