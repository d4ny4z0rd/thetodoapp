"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function InputTodo() {
	const router = useRouter();
	const [title, setTitle] = useState("");

	const handleSubmit = async () => {
		if (!title) {
			const errorMessage = "Title is required";
			toast.error(errorMessage);
		}
		try {
			const res = await fetch("api/todos/", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					title,
				}),
			});
			if (res.ok) {
				toast.success("Todo created successfully");
				setTitle("");
				router.refresh();
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-row gap-2 my-10">
			<Input
				value={title}
				className="text-md"
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter a todo"
			/>
			<Button className="text-md px-7" onClick={handleSubmit}>
				Add
			</Button>
		</div>
	);
}
