import { Form, useLoaderData } from "@remix-run/react";
import { getTodos, addTodo, deleteTodo} from "~/data/todos";

export const loader = () => {
  return getTodos();
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const _method = formData.get("_method");

  if (_method === "delete") {
    const id = Number(formData.get("id"));
    deleteTodo(id);
  } else {
    const text = formData.get("text");
    if(text) addTodo(text);
  }

  return null;
};

export default function Index() {
  const todos = useLoaderData();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto", backgroundColor: "white", minHeight: "100vh", color: "#333"}}>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Task List</h1>

      {/* Form para adicionar uma nova tarefa */}
      <Form method="post" style={{ display: "flex", gap: "1rem", marginBottom: "2rem"}}>
        <input type="text" name="text" placeholder="Nova Tarefa" style={{flex: 1, padding: "0.5rem", fontSize: "1rem", background: "#F1F1F1"}} required />
        <button type="submit" style={{ marginLeft: "1rem", textAlign: "center", padding: "0.5rem 1rem", fontSize: "1rem", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>Adicionar</button>
      </Form>

      {/* Lista das Tarefas */}
      <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0}}>
        {todos.map((todo) => (
          <li key={todo.id} style={{background: "#f4f4f4", padding: "0.75rem 1rem", marginBottom: "0.5rem", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {todo.text}
            <Form method="post" style={{ display: "inline"}}>
              <input type="hidden" name="_method" value="delete" />
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" style={{ marginLeft: "1rem", color: "white", border: "none", borderRadius: "4px", padding: "0.3rem 0.6rem"}}>❌</button>
            </Form>
          </li>
        ))}
      </ul>

    </main>
  )
}