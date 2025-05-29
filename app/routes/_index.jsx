// Importa componentes do Remix
// - Form: componente inteligente que lida com rotas
// - useLoaderData: "gancho" que acessa os dados carregados pelo loader
import { Form, useLoaderData } from "@remix-run/react";

// Importa as funções auxiliares para gerenciar as tarefas
import { getTodos, addTodo, deleteTodo} from "~/data/todos";

// Função loader: roda no servidor antes de renderizar a página
// Aqui, tá buscando a lista de tarefas salvas
export const loader = () => {
  return getTodos();
};

// Função action: trata requisições POST feitas por formulários
export const action = async ({ request }) => {
  const formData = await request.formData(); // Lê os dados enviados no formulário
  const _method = formData.get("_method"); // Verifica se é uma ação de deletar

  if (_method === "delete") {
    const id = Number(formData.get("id")); // Pega o ID da tarefa a ser deletada
    deleteTodo(id); // Apaga a tarefa
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