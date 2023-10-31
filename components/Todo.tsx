"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface TodoProps {
	id: string;
	author: string;
	title: string;
	email: string;
	datepublished: string;
}

export default function Todo({
	id,
	author,
	title,
	email,
	datepublished,
}: TodoProps) {
	const router = useRouter();

	const handleDelete = async () => {
		try {
			const res = await fetch(`api/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
			});
			if (res.ok) {
				console.log("Todo deleted");
				const todo = await res.json();
				toast.success("Todo deleted successfully");
				router.refresh();
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		}
	};

	return (
		<div className="my-4 border border-300 py-8 flex flex-row justify-between">
			<div className="text-center text-lg ml-4 border pt-1">{title}</div>
			<div className="flex justify-between mr-4 gap-2">
				<span>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your todo.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleDelete}>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</span>
			</div>
		</div>
	);
}
