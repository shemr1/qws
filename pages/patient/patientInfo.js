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

	const [data, setData] = useState({
		name: current.name,
		email: current.email,
		message: "Patient personal info updated",
	});

	function eraseText(e) {
		document.getElementById(e).value = "";
	}

	async function patchAllergies(ref, e) {
		value.ref = ref;
		value.value = e;
		try {
			await fetch("/api/patient/updateAllergies", {
				method: "PATCH",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(value),
			});
			// router.reload();
		} catch (error) {
			console.log(error.message);
		}
	}

	async function patchInjuries(ref, e) {
		value.ref = ref;
		value.value = e;
		try {
			await fetch("/api/patient/updateInjuries", {
				method: "PATCH",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(value),
			});
			// router.reload();
		} catch (error) {
			console.log(error.message);
		}
	}

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
				<h1 className="text-2xl">{current.name}</h1>
				<p>email: {current.email}</p>
				<div className="space-y-2">
					<h2 className="font-semibold">Allergies</h2>
					<p>{current.allergies.toString()}</p>
					<h2 className="font-semibold">Previous critical injuries</h2>
					<p>{current.Injuries.toString()}</p>
				</div>
				<div className="card">
					<div className="p-3">
						<h1>Add injuries</h1>
						<form>
							<label>
								Injury:
								<input
									id="injury"
									type="text"
									name="injuries"
									className="block mb-2 text-sm font-medium border-slate-500 text-gray-900 dark:text-gray-300 border-2 rounded-lg"
								/>
							</label>
							<button
								className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
								type="button"
								onClick={() => {
									let ref = session.data.userId;
									let value = document.getElementById("injury").value;
									patchAllergies(ref, value);
									email();
									eraseText("injury");
								}}
							>
								ADD
							</button>
						</form>
					</div>
					<div className="p-3">
						<h1>Add Allergies</h1>
						<form>
							<label>
								Allergy:
								<input
									id="allergy"
									type="text"
									name="allergies"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 border-2 rounded-lg border-slate-500"
								/>
							</label>
							<button
								className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
								type="button"
								onClick={() => {
									let ref = session.data.userId;
									let value = document.getElementById("allergy").value;
									patchInjuries(ref, value);
									email();
									eraseText("allergy");
								}}
							>
								ADD
							</button>
						</form>
					</div>

					<button
						onClick={() => {
							let ref = session.data.userId;
							deleteProfile(ref);
						}}
						type="button"
						className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					>
						Delete Profile
					</button>

					<button
						onClick={() => {
							signOut();
							router.push("/");
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
