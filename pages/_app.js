import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			{Component.auth ? (
				<Auth>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Auth>
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</SessionProvider>
	);
}

function Auth({ children }) {
	const { data: session, status } = useSession({ required: true });
	const isUser = !!session?.user;

	if (isUser) {
		return children;
	}

	return <div>Loading...</div>;
}
