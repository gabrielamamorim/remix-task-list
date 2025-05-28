let todos = [];

export function getTodos() {
    return todos;
}

export function addTodo(text) {
    const newTodo = { id: Date.now(), text};
    todos.push(newTodo);
}

export function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
}