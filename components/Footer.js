const Footer = () => {
	return (
		<footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black fixed bottom-0 inset-x-0">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022 <a className="hover:underline">QMS™</a>. All Rights Reserved.
			</span>
			<ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6 ">
						About
					</a>
				</li>

				<li>
					<a href="#" className="hover:underline">
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;