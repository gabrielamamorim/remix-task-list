// Array em memória para armazenar as tarefas temporariamente
// Será resetado sempre que o servidor reiniciar
let todos = [
    { id: 1, text: "Estudar Remix" },
    { id: 2, text: "Fazer apresentação" },
];

// Função para obter todas as tarefas
// Usada no loader da rota principal
export function getTodos() {
    return todos;
}

// Função para adicionar uma nova tarefa ao array
export function addTodo(text) {
    // Gera um ID simples (com base na hora atual)
    const newTodo = { id: Date.now(), text};
    todos.push(newTodo); // Adiciona a tarefa ao array
}

// Função para deletar uma tarefa com base no ID
export function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id); // Remove do array
}

module.exports = {
    getTodos,
    addTodo, 
    deleteTodo,
}