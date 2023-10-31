"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SigninButton() {
	return (
		<>
			<div className="mt-72 p-4 flex flex-col items-center justify-center gap-4">
				<button
					className="flex items-center p-4 rounded-sm gap-4 bg-slate-100 hover:bg-slate-200 transition"
					onClick={() => signIn("github")}>
					<span>
						<Image
							src={"/github-logo.svg"}
							width={30}
							height={30}
							alt="GitHub Logo"
						/>
					</span>
					Continue with GitHub
				</button>
			</div>
		</>
	);
}
