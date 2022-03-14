import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "PATCH") {
		const { ref, value } = req.body;
		//Connect with database
		const client = new MongoClient(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await client.connect();

		const db = client.db("QMS");

		const status = await db
			.collection("patients")
			.updateOne({ ref: ref }, { $push: { Injuries: value } });
		//Send success response
		res.status(201).json({ message: "Patient updated", ...status });
		//Close DB connection
		client.close();
	} else {
		//Response for other than POST method
		res.status(500).json({ message: "Route not valid" });
	}
}

export default handler;
