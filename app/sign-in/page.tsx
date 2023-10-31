import SigninButton from "@/components/SigninButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return <SigninButton />;
}
