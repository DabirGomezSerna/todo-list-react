import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

// Esta función nos genera cada item individual de la lista de to-do's
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item-container">
      <div className="todo-items">
        <div className="todo-item-title">
          {/** 
           * Este input es el recuadro para marcar si la tarea esta completada o no.
           * Cuando el usuario marca el recuadro, mandamos llamar la función 'onToggle', 
           * que cambia el valor de 'done' de la tarea
           */}
          <input
            type="checkbox"
            id={todo.id}
            name="todo-checkbox"
            checked={JSON.parse(todo.done)}
            onChange={() => onToggle?.(todo.id)}
          />
          {/**
           * Aqui, usamos una condición para saber si poner a la tarea una linea gris
           * para indicar que la tarea esta completada. 
           */}
          {todo.done === "true" ? (
            <label
              id={todo.id}
              htmlFor="todo-checkbox"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {todo.title}
            </label>
          ) : (
            <label id={todo.id} htmlFor="todo-checkbox">
              {todo.title}
            </label>
          )}
        </div>
        {/**
         * Este boton simplemente llama la función 'onDelete' para borrar la tarea 
         * de la lista. 
         */}
        <div className="todo-item-button">
          <button onClick={() => onDelete?.(todo.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
}
