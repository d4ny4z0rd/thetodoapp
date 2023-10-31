import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TodoType } from "@/app/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Todo from "./Todo";

const getTodos = async (email: string) => {
	try {
		const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
		const { todos } = await res.json();
		return todos;
	} catch (error) {
		return null;
	}
};

export default async function TodoList() {
	const session = await getServerSession(authOptions);
	const email = session?.user?.email;
	let todos = [];

	if (!session) {
		redirect("sign-in");
	}

	if (email) {
		todos = await getTodos(email);
	}

	return (
		<div>
			{todos && todos.length > 0 ? (
				todos.map((todo: TodoType) => (
					<Todo
						key={todo.id}
						id={todo.id}
						title={todo.title}
						author={""}
						email={todo.authorEmail}
						datepublished={todo.createdAt}
					/>
				))
			) : (
				<div>No todos to display</div>
			)}
		</div>
	);
}
