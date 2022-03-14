import React, { useState } from "react";
import Patient from "../../models/patientModel";
import connectDB from "../../lib/connectDB";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

const PatientInfo = ({ patient }) => {
	const { status } = useSession();
	const session = useSession();
	const router = useRouter();
	console.log(session);
	let current = patient[0];
	const contentType = "application/json";
	const [value, setValues] = useState({
		ref: "",
		value: "",
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

	async function deleteProfile(e) {
		try {
			await fetch("/api/patient", {
				method: "DELETE",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(value),
			});
		} catch (error) {}
	}

	if (status === "loading") {
		return <>loading</>;
	}

	return (
		<>
			<div className="container font-mono space-y-4 justify-center">
				{" "}
				<h1 className="text-2xl">{session.data.user.name}</h1>
				<p>email: {session.data.user.email}</p>
				<div className="card">
					<button
						onClick={async () => {
							let ref = session.data.userId;
							await router.push("/");
							signOut();
							deleteProfile(ref);
						}}
						type="button"
						className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					>
						Delete Profile
					</button>

					<button
						onClick={async () => {
							await router.push("/");
							signOut();
						}}
						type="button"
						className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
					>
						Signout
					</button>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	await connectDB();

	const res = await Patient.find().where("ref").in(session.userId);
	const doc = JSON.stringify(res);
	let patient = JSON.parse(doc);

	return {
		props: {
			patient,
		}, // will be passed to the page component as props
	};
}

export default PatientInfo;
