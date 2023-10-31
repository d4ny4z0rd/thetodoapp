"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
	const { status, data: session } = useSession();

	return (
		<div className="flex justify-between pb-4 mb-4">
			<div>
				<Link href={"/"}>
					<h1 className="text-4xl font-bold tracking-tighter">Todo App</h1>
				</Link>
			</div>
			{status === "authenticated" ? (
				<div className="flex gap-14">
					<div>
						<Image
							src={session?.user?.image || ""}
							width={36}
							height={36}
							alt="Profile Picture"
							className="rounded-full cursor-pointer"
						/>
					</div>
					<div className="pt-0">
						<Button
							onClick={() => signOut()}
							className="bg-white hover:bg-slate-100 text-black text-md">
							Log out
						</Button>
					</div>
				</div>
			) : (
				<div>
					<Button className="px-6 py-3">
						<Link href={"/sign-in"} className="text-md">
							Log in
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
