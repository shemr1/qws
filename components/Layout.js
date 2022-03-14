import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div className=" flex flex-col ">
			<Navbar />
			<div className=" flex grow h-full justify-center ">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
