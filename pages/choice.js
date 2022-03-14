import React from "react";
import Image from "next/image";
import Link from "next/link";

const Choice = () => {
	return (
		<div className="pt-72 ">
			<div>
				<h1 className="text-3xl p-4">What are you today?...</h1>
			</div>
			<div className="grid grid-flow-col auto-cols-max gap-32 place-content-center h-max">
				<Link href="/patient/register">
					<Image
						src="/choice/bq2hoitrdvuhj10c99bacp2pvs.png"
						alt=""
						height="300"
						width="300"
					/>
				</Link>

				<Link href="/doctors/register">
					<Image
						src="/choice/physician-hospital-medicine-doctor-s-office-health-transparent-doctor-cliparts-56d26ae7de9d0c7b50a27f757d512159.png"
						alt=""
						height="300"
						width="300"
					/>
				</Link>
			</div>
			<div className="grid grid-flow-col auto-cols-max gap-96 place-content-center h-max">
				<h2>Patient</h2>
				<h2>Doctor</h2>
			</div>
		</div>
	);
};

export default Choice;
