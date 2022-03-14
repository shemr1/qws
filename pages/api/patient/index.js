import { MongoClient } from "mongodb";
import User from "../../../models/userModel";
import Patient from "../../../models/patientModel";
import { hash } from "bcryptjs";

async function handler(req, res) {
	switch (method) {
		case "GET":
			try {
				const patients = await Patient.find(
					{},
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: patients });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const { email, password, name, dob, ip } = req.body;
				let date = new Date(dob);
				//Validate
				if (!email || !email.includes("@") || !password) {
					res.status(422).json({ message: "Invalid Data" });
					return;
				}
				//Connect with database
				const client = new MongoClient(process.env.MONGODB_URI, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
				});
				await client.connect();

				const db = client.db("QMS");
				//Check existing
				const checkExisting = await db
					.collection("users")
					.findOne({ email: email });
				//Send error response if duplicate user is found
				if (checkExisting) {
					res.status(422).json({ message: "Patient already exists" });
					client.close();
					return;
				}
				//Hash password

				const newUser = new User({
					name: name,
					email: email,
					password: await hash(password, 12),
					ip: ip,
					role: "patient",
				});

				const status = await db.collection("users").insertOne(newUser);
				console.log(status.insertedId);
				let id = status.insertedId;

				const newPatient = new Patient({
					dateOfBirth: date,
					name: name,
					email: email,

					ref: id,
				});
				console.log(newPatient);
				await db.collection("patients").insertOne(newPatient);
				//Send success response
				res.status(201).json({ message: "Patient created", ...status });
				//Close DB connection
				client.close();
			} catch (error) {
				res.status(400).json({ success: false, msg: error.message });
			}
			break;

		case "DELETE":
			try {
				await Patient.deleteOne({
					ref: req.body,
				});
				await User.deleteOne({
					_id: req.body,
				});
				res.status(201).json({ success: true });
			} catch (e) {
				res.status(400).json({ success: false, msg: e.message });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

export default handler;
