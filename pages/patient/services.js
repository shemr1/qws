import React from "react";
import Link from "next/link";

const Services = () => {
	return (
		<div className="pb-16" style={{ fontFamily: '"Lato", sans-serif' }}>
			<dh-component>
				<section className="max-w-8xl mx-auto container bg-white pt-16">
					<div>
						<div role="contentinfo" className="flex items-center flex-col px-4">
							<h1
								tabIndex={0}
								className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4"
							>
								Schedule a visit with us today. Click on one of our services to
								get started.
							</h1>
						</div>
						<div
							aria-label="group of cards"
							className="focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4"
						>
							<Link href="/patient/service/general">
								<div
									aria-label="card 1"
									className="focus:outline-none flex sm:w-full md:w-5/12 pb-20 border-2 border-gray-300 p-1 rounded-lg"
								>
									<div className="w-20 h-20 relative mr-5">
										<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
										<div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
											<img
												src="https://cdn-icons.flaticon.com/png/512/2902/premium/2902055.png?token=exp=1647021072~hmac=d71a8be0d0a0ad751fdc2763e076f83b"
												alt="drawer"
											/>
										</div>
									</div>
									<div className="w-10/12">
										<h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">
											General Services
										</h2>
										<p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
											Feeling sick or just want a check up? Schedule a visit
											with us today.
										</p>
									</div>
								</div>
							</Link>
							<Link href="/patient/service/pedeatrics">
								<div
									aria-label="card 2"
									className="focus:outline-none flex sm:w-full md:w-5/12 pb-20 border-2 border-gray-300 p-1 rounded-lg"
								>
									<div className="w-20 h-20 relative mr-5">
										<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
										<div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
											<img
												src="https://cdn-icons-png.flaticon.com/512/3884/3884934.png"
												alt="check"
											/>
										</div>
									</div>
									<div className="w-10/12">
										<h2 className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">
											Pedeatrics
										</h2>
										<p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
											Our tiny tots need to be taken care of in the best way
											possible. Here we treat everyone like family especially
											the youngest ones.
										</p>
									</div>
								</div>
							</Link>
							<Link href="/patient/service/SW">
								<div
									aria-label="card 3"
									className="focus:outline-none flex sm:w-full md:w-5/12 pb-20 border-2 border-gray-300 p-1 rounded-lg"
								>
									<div className="w-20 h-20 relative mr-5">
										<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
										<div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
											<img
												src="https://cdn-icons.flaticon.com/png/512/4092/premium/4092680.png?token=exp=1647021256~hmac=218ff345ef704dafc04192bd008f1ce8"
												alt="html tag"
											/>
										</div>
									</div>
									<div className="w-10/12">
										<h2 className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">
											Sexual Wellness
										</h2>
										<p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
											{`We know that not every issue can be easily explained or
											discussed. We're here to help with our discrete staff to
											help.`}
										</p>
									</div>
								</div>
							</Link>
							<Link href="/patient/service/physio">
								<div
									aria-label="card 4"
									className="focus:outline-none flex sm:w-full md:w-5/12 pb-20 border-2 border-gray-300 p-1 rounded-lg"
								>
									<div className="w-20 h-20 relative mr-5">
										<div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
										<div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
											<img
												src="https://cdn-icons-png.flaticon.com/512/3209/3209080.png"
												alt="monitor"
											/>
										</div>
									</div>
									<div className="w-10/12">
										<h2 className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">
											Physical Therapy
										</h2>
										<p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
											Need help recovering from an injury or just have nagging
											aches and pains? Our certified members can help you get
											back in tip top shape.
										</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</section>
			</dh-component>
			{/* Code block ends */}
		</div>
	);
};

export default Services;
