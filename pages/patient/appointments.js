import React, { useState, useEffect } from "react";
import connectDB from "../../lib/connectDB";
import Appointments from "../../models/appointmentModel";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MyAppointments = ({ pending, approved, declined }) => {
	const [openTab, setOpenTab] = React.useState(1);
	const { data: status } = useSession();
	const session = useSession();
	const router = useRouter();

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
								Pending
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
								Approved
							</a>
						</li>
						<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
							<a
								className={
									"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
									(openTab === 3 ? "text-white bg-black" : "text-600 bg-white")
								}
								onClick={(e) => {
									e.preventDefault();
									setOpenTab(3);
								}}
								data-toggle="tab"
								href="#link3"
								role="tablist"
							>
								Rejected
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
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Requested time: {app.time}
												</p>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Status: {app.status}
												</p>
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
								<div className={openTab === 3 ? "block" : "hidden"} id="link3">
									{declined.map((app) => (
										<div className="col-md-3 animated fadeIn" key={app._id}>
											<a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
												<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Patient: {app.patient}
												</h5>
												<h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
													Requested date:{" "}
													{new Date(app.date).toLocaleDateString()}
												</h3>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Requested time: {app.time}
												</p>
												<p className="font-normal text-gray-700 dark:text-gray-400">
													Status: {app.status}
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

	const pendres = await Appointments.find()
		.where("ref")
		.in(session.userId)
		.where("status")
		.in("pending");
	const resp = JSON.stringify(pendres);
	let pending = JSON.parse(resp);

	const appres = await Appointments.find()
		.where("ref")
		.in(session.userId)
		.where("status")
		.in("approved");
	const resa = JSON.stringify(appres);
	let approved = JSON.parse(resa);

	const decres = await Appointments.find()
		.where("ref")
		.in(session.userId)
		.where("status")
		.in("declined");
	const resd = JSON.stringify(decres);
	let declined = JSON.parse(resd);

	return {
		props: {
			pending,
			approved,
			declined,
		}, // will be passed to the page component as props
	};
}

export default MyAppointments;
