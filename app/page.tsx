import InputTodo from "@/components/InputTodo";
import TodoList from "@/components/TodoList";

export default async function Home() {
	return (
		<div>
			<InputTodo />
			<TodoList />
		</div>
	);
}
