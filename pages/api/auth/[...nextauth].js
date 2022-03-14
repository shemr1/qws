import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectDB from "../../../lib/connectDB";
import User from "../../../models/userModel";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: "jwt",
	},
	jwt: {
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("authorization started");

				connectDB();
				const { email, password } = credentials;
				console.log(email, password);
				const user = await User.findOne({ email: email });

				console.log(user);

				if (!user) {
					return res
						.status(404)
						.json({ error: "user dont exists with that email" });
				} else {
				}
				const doMatch = await bcrypt.compare(password, user.password);
				console.log(doMatch);
				if (!doMatch) {
					return res.status(401).json({ error: "Invalid credentials" });
				}

				if (user) {
					console.log("logging in");
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token[account.provider] = {
					accessToken: account.oauth_token,
					refreshToken: account.oauth_token_secret,
				};
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;

			session.userId = token.sub;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
	},

	database: process.env.DATABASE_URL,
	secret: process.env.SECRET_KEY,
});
