import TodoItem from "./TodoItem";

// Esta función es nuestra lista de to-do's, lo unico que hace es recorrer todos los to-dos
// que le enviamos (le podemos enviar todos, los pendientes o los terminados) 
// y los muestra todos.
export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onFilterChange,
}) {
  return (
    <div className="todo-list">
      <div className="todo-list-container">
        <div className="todo-list-items">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id || index}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onFilterChange={onFilterChange}
            ></TodoItem>
          ))}
        </div>
      </div>
    </div>
  );
}
