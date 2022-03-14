import mongoose from "mongoose";

const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.group("Already connected");
		return;
	}

	mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
		if (err) throw err;
		console.log("Connected to mongoose database");
	});
};

export default connectDB;
