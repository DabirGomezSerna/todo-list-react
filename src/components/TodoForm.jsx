import { useState } from "react";

// Esta función recibe solamente el parametro 'onAdd', que es la función 'createNewTodo'
// en App.js
export default function TodoForm({ onAdd }) {

  // Este estado guarda el titulo de la nueva tarea, o sea lo que sea que haya escrito el
  // usuario
  const [todoTitle, setTodoTitle] = useState("");

  // Esta función actualiza el titulo de la nueva tarea cada vez que se interactua con 
  // el input apropiado
  const handleInputChange = (e) => {
    const { value } = e.target;
    setTodoTitle(value.trim());
  };

  // Aqui validamos que el input no este vacío, si lo esta no se agregara la tarea
  // a la lista
  const validateForm = () => {
    if (todoTitle) return true;
    else return false;
  };

  // Esta funcion es la que manda a llamar el parametro 'onAdd', que es la función
  // 'createNewTodo'
  const handleSubmit = (e) => {

    // e.target.reset() nos vacía el campo de input ya que se haya ingresado algo
    e.target.reset();

    // e.preventDefault() previene que se recargue la página cuando hacemos submit
    // en el Form
    e.preventDefault();

    if (validateForm()) {
      
      // Aqui es donde mandamos llamar 'onAdd', que lleva como parametro
      // el titulo nuevo del to-do 
      onAdd?.(todoTitle);
    }

    // Ya que se haya agregado el titulo al onAdd, nos aseguramos que el estado de 
    // 'todoTitle' regrese a estar vacío
    setTodoTitle("");
  };

  return (
    <div className="form-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          className="title-input"
          type="text"
          id="title-input"
          name="title-input"
          placeholder="Add task here"
          onChange={handleInputChange}
        />
        <button
          className="title-button"
          id="title-button"
          name="title-button"
          type="submit"
          // Si la longitud del estado 'todoTitle' es 0 (o sea, el input esta vacío)
          // entonces el boton se deshabilita (la propiedad disabled acepta como valor
          // un booleano)
          disabled={todoTitle.length === 0}
        >
          + Add
        </button>
      </form>
    </div>
  );
}
