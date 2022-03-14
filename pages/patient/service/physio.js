import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const GS = () => {
	const router = useRouter();
	const { status } = useSession();
	const session = useSession();
	const current = new Date().toISOString().split("T")[0];
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);

	const [form, setForm] = useState({
		patientID: "",
		patient: "",
		email: "",
		contact: "",
		time: "",
		date: "",
		status: "pending",
		doctorID: "",
		doctor: "",
		service: "Physio",
		reason: "",
	});

	const request = async (form) => {
		try {
			await fetch("/api/appointments", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		console.log("submitting");
		e.preventDefault();
		form.patientID = session.data.userId;
		form.patient = session.data.user.name;
		form.email = session.data.user.email;

		request(form);
	};

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
			<div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
				<img
					className="w-full"
					alt="img of a girl posing"
					src="https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				/>
				<img
					className="mt-6 w-full"
					alt="img of a girl posing"
					src="https://images.pexels.com/photos/8312899/pexels-photo-8312899.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				/>
			</div>
			<div className="md:hidden">
				<img
					className="w-full"
					alt="img of a girl posing"
					src="https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				/>
				<div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
					<img
						alt="img-tag-one"
						className="md:w-48 md:h-48 w-full"
						src="https://images.pexels.com/photos/8312899/pexels-photo-8312899.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					/>
				</div>
			</div>
			<div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
				<div className="border-b border-gray-200 pb-6">
					<p className="text-sm leading-none text-gray-600">
						Quality Medical Services Limited
					</p>
					<h1
						className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
					>
						Physiotherapy
					</h1>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="contact" className="sr-only">
							Contact
						</label>
						<input
							id="contact"
							name="contact"
							type="tel"
							onChange={handleChange}
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Contact number (999-999-9999)"
						/>
					</div>
					<div>
						<label htmlFor="date" className="sr-only">
							Password
						</label>
						<input
							id="date"
							name="date"
							type="date"
							onChange={handleChange}
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Date"
							min={current}
						/>
					</div>
					<div>
						<label htmlFor="time" className="sr-only">
							Time
						</label>
						<input
							id="time"
							name="time"
							type="time"
							onChange={handleChange}
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="time"
							min="09:00"
							max="17:00"
						/>
					</div>
					<div>
						<label htmlFor="reason" className="sr-only">
							Reason
						</label>
						<textarea
							id="reason"
							name="reason"
							type="text"
							onChange={handleChange}
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Give a brief summary of your reason for requesting an appointment."
						/>
					</div>
					<button
						type="submit"
						className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
					>
						Send Appointment Request
					</button>
				</form>

				<div>
					<p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
						It is a long established fact that a reader will be distracted by
						thereadable content of a page when looking at its layout. The point
						of usingLorem Ipsum is that it has a more-or-less normal
						distribution of letters.
					</p>
					<p className="text-base leading-4 mt-7 text-gray-600">
						Services included:
					</p>
					<p className="text-base leading-4 mt-4 text-gray-600">
						Functional Rehab
					</p>
					<p className="text-base leading-4 mt-4 text-gray-600">
						Massage Therapy
					</p>
					<p className="text-base leading-4 mt-4 text-gray-600">Chiropractic</p>
					<p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
						Strength & Conditioning
					</p>
				</div>
				<div>
					<div className="border-t border-b py-4 mt-7 border-gray-200">
						<div
							onClick={() => setShow(!show)}
							className="flex justify-between items-center cursor-pointer"
						>
							<p className="text-base leading-4 text-gray-800">
								Appointment notice
							</p>
							<button
								className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
								aria-label="show or hide"
							>
								<svg
									className={"transform " + (show ? "rotate-180" : "rotate-0")}
									width="10"
									height="6"
									viewBox="0 0 10 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 1L5 5L1 1"
										stroke="#4B5563"
										strokeWidth="1.25"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<div
							className={
								"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
								(show ? "block" : "hidden")
							}
							id="sect"
						>
							The appointment request once requested will be either denied or
							accepted by a medical practitioner once they deem it suitable for
							their application.
						</div>
					</div>
				</div>
				<div>
					<div className="border-b py-4 border-gray-200">
						<div
							onClick={() => setShow2(!show2)}
							className="flex justify-between items-center cursor-pointer"
						>
							<p className="text-base leading-4 text-gray-800">Contact us</p>
							<button
								className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
								aria-label="show or hide"
							>
								<svg
									className={"transform " + (show2 ? "rotate-180" : "rotate-0")}
									width="10"
									height="6"
									viewBox="0 0 10 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 1L5 5L1 1"
										stroke="#4B5563"
										strokeWidth="1.25"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<div
							className={
								"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
								(show2 ? "block" : "hidden")
							}
							id="sect"
						>
							If you have any questions on how to return your item to us,
							contact us. Note our business hours are 9 am to 7 pm.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GS;
