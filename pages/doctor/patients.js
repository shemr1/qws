import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Patients = ({ patients }) => {
	const { data: status } = useSession();

	function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	console.log(patients);

	if (status === "loading") {
		return <>loading</>;
	}

	return (
		<div className="container p-3">
			{patients.map((patient) => (
				<div className="col-md-3 animated fadeIn p-3" key={patient._id}>
					<a
						href="#"
						className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
					>
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{patient.name}
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							{patient.email}
						</p>
						<p className="font-normal text-gray-700 dark:text-gray-400 ">
							Injuries
						</p>
						<p className="font-normal text-gray-700 dark:text-gray-400 p-2">
							{patient.Injuries.toString()}
						</p>
						<p className="font-normal text-gray-700 dark:text-gray-400 ">
							Allergies
						</p>
						<p className="font-normal text-gray-700 dark:text-gray-400 p-2">
							{patient.allergies.toString()}
						</p>
					</a>
				</div>
			))}
		</div>
	);
};

export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/api/doctors/patients", {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"User-Agent": "*",
			"Content-Type": "application/json",
		},
	});
	const json = await res.json();
	let patients = json.data;
	console.log(patients);
	return {
		props: {
			patients,
		},
	};
}

export default Patients;
