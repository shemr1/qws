import React, { useState, useEffect } from "react";
import connectDB from "../../lib/connectDB";
import Appointments from "../../models/appointmentModel";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DocAppointments = ({ pending, approved }) => {
	const [openTab, setOpenTab] = React.useState(1);
	const { data: status } = useSession();
	const session = useSession();
	const router = useRouter();
	const contentType = "application/json";
	console.log(session);

	const [body, setBody] = useState({
		id: "",
		doctorID: "",
		doctor: "",
		status: "",
	});

	const [data, setData] = useState({
		name: "",
		email: "",
		message: "",
	});

	async function email() {
		console.log("Sending");

		try {
			await fetch("/api/email", {
				method: "POST",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.log(error.message);
		}
	}

	const patch = async (body) => {
		try {
			await fetch("/api/appointments", {
				method: "PATCH",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(body),
			});

			router.reload();
		} catch (error) {
			console.log(error.message);
		}
	};

	if (status === "loading") {
		return <>loading</>;
	}

	return (
		<>
			<div className="flex flex-grow">
				<div className="w-full">
					<ul
						className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
						role="tablist"
					>
						<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
							<a
								className={
									"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
									(openTab === 1 ? "text-white bg-black" : "text-600 bg-white")
								}
								onClick={(e) => {
									e.preventDefault();
									setOpenTab(1);
								}}
								data-toggle="tab"
								href="#link1"
								role="tablist"
							>
								Requests
							</a>
						</li>
						<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
							<a
								className={
									"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
									(openTab === 2 ? "text-white bg-black" : "text-600 bg-white")
								}
								onClick={(e) => {
									e.preventDefault();
									setOpenTab(2);
								}}
								data-toggle="tab"
								href="#link2"
								role="tablist"
							>
								Appointments
							</a>
						</li>
					</ul>
					<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
						<div className="px-4 py-5 flex-auto">
							<div className="tab-content tab-space">
								<div className={openTab === 1 ? "block" : "hidden"} id="link1">
									{pending.map((app) => (
										<div className="col-md-3 animated fadeIn" key={app._id}>
											<a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
												<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Patient: {app.patient}
												</h5>
												<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Requested date:{" "}
													{new Date(app.date).toLocaleDateString()}
												</h3>
												<p className="font-normal text-gray-700 dark:text-gray-400"></p>
													Requested time: {app.time}
												</p>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Reason: {app.reason}
												</p>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Status: {app.status}
												</p>
												<div className=" p-3 gap-4">
													<button
														onClick={() => {
															(body.doctorID = session.data.userId),
																(body.doctor = session.data.user.name),
																(body.id = app._id);
															body.status = "approved";
															patch(body);
															data.email = patient.email;
															data.name = patient.name;
															data.message =
																"Your appointment request has been approved. Please review details";
															email();
														}}
														type="button"
														className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
													>
														<img src="https://img.icons8.com/external-becris-lineal-becris/16/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png" />{" "}
													</button>
													<button
														onClick={() => {
															(body.doctorID = session.data.userId),
																(body.doctor = session.data.user.name),
																(body._id = app._id);
															body.status = "declined";
															patch(body);
															data.email = patient.email;
															data.name = patient.name;
															data.message =
																"Your appointment request has been declined. Please review details";
															email();
														}}
														type="button"
														className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
													>
														<img src="https://img.icons8.com/ios/16/000000/x.png" />
													</button>
												</div>
											</a>
										</div>
									))}
								</div>
								<div className={openTab === 2 ? "block" : "hidden"} id="link2">
									{approved.map((app) => (
										<div className="col-md-3 animated fadeIn" key={app._id}>
											<a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
												<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Patient: {app.patient}
												</h5>
												<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Appointment date:{" "}
													{new Date(app.date).toLocaleDateString()}
												</h3>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Appointment time: {app.time}
												</p>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Status: {app.doctor}
												</p>
											</a>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	await connectDB();

	const pendres = await Appointments.find().where("status").in("pending");
	const resp = JSON.stringify(pendres);
	let pending = JSON.parse(resp);

	const appres = await Appointments.find()
		.where("doctorID")
		.in(session.userId)
		.where("status")
		.in("approved");
	const resa = JSON.stringify(appres);
	let approved = JSON.parse(resa);

	return {
		props: {
			pending,
			approved,
			session,
		}, // will be passed to the page component as props
	};
}

export default DocAppointments;
