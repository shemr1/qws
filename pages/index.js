import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className="flex place-content-center w-max ">
			<div className="page-container-welcome grid grid-flow-row auto-rows-max gap-10 pt-64 p-8 ">
				<p className="text-9xl font-bold leading-10 text-yellow-500">Quality</p>
				<p className="text-xl leading-loose text-gray-400">
					is our first name and we live by that. Come join our family and
					experience the best in the industry
				</p>
				<button className="w-48 h-16  text-xl bg-gray-800 font-semibold leading-tight text-white rounded-full">
					Get Started
				</button>
			</div>
		</div>
	);
}
