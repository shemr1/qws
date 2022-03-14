import connectDB from "../../../lib/connectDB";
import Appointments from "../../../models/appointmentModel";

export default async function handler(req, res, session) {
	const { method, headers } = req;

	connectDB();

	switch (method) {
		case "GET":
			try {
				const appointments = await Appointments.find(
					{},
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: appointments });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const Appointment = await Appointments.create(
					req.body,
				); /* create a new model in the database */
				res.status(201).json({ success: true, data: Appointment });
			} catch (error) {
				res.status(400).json({ success: false, msg: error.message });
			}
			break;
		case "PATCH":
			try {
				await Appointments.findByIdAndUpdate(
					{ _id: req.body.id },
					{
						$set: {
							status: req.body.status,
							doctorID: req.body.doctorID,
							doctor: req.body.doctor,
						},
					},
				);
				res.status(201).json({ success: true });
			} catch (e) {
				res.status(400).json({ success: false, msg: e.message });
			}
			break;
		case "DELETE":
			try {
				await Appointments.deleteOne({
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
