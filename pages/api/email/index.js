const nodemailer = require("nodemailer");

export default function (req, res) {
	const { name, email, message } = req.body;

	const transporter = nodemailer.createTransport({
		port: 465,
		host: "smtp.gmail.com",
		auth: {
			user: "shemrs1@gmail.com",
			pass: process.env.PASSWORD,
		},
		secure: true,
	});
	const mailData = {
		from: "QMS@noreply.com",
		to: email,
		subject: `Message From ${req.body.name}`,
		text: message + " | Sent from: ",
		html: `<div>${message}</div><p>Sent from:
    </p>`,
	};
	transporter.sendMail(mailData, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
	res.status(200).json({ message: "Email sent", ...mailData });
}
