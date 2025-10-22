import {useState, useEffect} from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";

import { STORAGE_KEYS } from "./utils/constants";
import { saveToStorage, getFromStorage } from "./utils/localStorage";

import todoListItems from "./data/todoItems.json";

function App() {
  // Active filter useState, controla en que pestaña esta el programa 
  // (todos, pendientes, terminados)
  const [activeFilter, setActiveFilter] = useState("all");

  // Este useState guarda todos los datos de los to-do's, y los saca de
  // local storage
  const [todos, setTodos] = useState(() =>
    getFromStorage(STORAGE_KEYS.TODO_ITEMS, todoListItems)
  );

  // Este useEffect se encarga de GUARDAR todos los datos de los to-do's al
  // local storage para que despues se puedan recuperar
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TODO_ITEMS, todos);
  }, [todos]);

  // Esta funcion crea un nuevo todo, se le pasa la variable 'todoData', que
  // en realidad solamente es el titulo de la tarea que crea el usuario.
  // Toda la demas informacion relevante del to-do es definida por el programa.
  const createNewTodo = (todoData) => {
    const newTodo = {

      // Id usa Date.now().toString() para siempre
      // generar un ID verdaderamente unico
      id: Date.now().toString(),
      title: todoData,
      done: "false",
    };

    setTodos((oldTodos) => [...oldTodos, newTodo]);
  };

  // Esta funcion controla si la propiedad de 'done' de una tarea esta en
  // verdadero o falso. Toma como parametro 'todoItem', que en realidad es
  // solamente el id del todo al que le queremos cambiar la propiedad.
  const onToggle = (todoItem) => {
    if (todoItem)
      setTodos((oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === todoItem
            ? {
                ...todo,
                done: todo.done === "false" ? "true" : "false",
              }
            : todo
        )
      );
  };

  // Esto borra el to-do de nuestra lista. Toma como parametro 'todoItem', igual
  // que la funcion de arriba de onToggle.
  const onDelete = (todoItem) => {
    setTodos((oldTodos) => oldTodos.filter((t) => t.id !== todoItem));
  };

  // Esta funcion cambia el estado del filtro activo. Toma como 
  // propiedad 'filter' que es simplemente un string 
  // que puede tener los valores de los estados de filtro ('active','done','all')
  // Eso se pasa a un switch, y dentro del switch es donde definimos el nuevo
  // estado.
  const onFilterChange = (filter) => {
    switch (filter) {
      case "active":
        setActiveFilter("active");
        break;
      case "done":
        setActiveFilter("done");
        break;
      case "all":
        setActiveFilter("all");
        break;
      default:
        setActiveFilter("all");
        break;
    }
  };

  // Esta funcion es lo que se usa para que las listas de todos los to-do's
  // se esten actualizando correctamente. No toma parametros, simplemente es 
  // una funcion que tiene un switch con la condición del filtro activo.
  const renderCurrentList = () => {
    switch (activeFilter) {
      case "active":

        // Todos los casos tienen la misma estructura, primero checamos si
        // existen to-dos en el estado. Si no existen, mandamos un mensaje que
        // nos dice que no hay tareas para hacer. Si si existen tareas, 
        // entonces pasamos a la segunda condición, que revisa si existen tareas
        // de la categoria que queremos (terminadas o pendientes). Si no, 
        // nos manda un mensaje que no hay tareas que cumplan con esa
        // condición. Siempre que existan tareas que cumplan con la condición, 
        // vamos a mandar llamar el componente TodoList pasandole los todos filtrados.
        
        // Primer if, checa si hay to-do's
        return todos.length !== 0 ? (
          // Segundo if, checa si hay to-do's pendientes
          todos.filter((t) => t.done === "false").length !== 0 ? (
            <TodoList
              todos={todos.filter((t) => t.done === "false")}
              onToggle={onToggle}
              onDelete={onDelete}
              onFilterChange={onFilterChange}
            ></TodoList>
          ) : (
            <div>
              <h3>No to-do's pending</h3>
              <p>All to-do's finished, add todos in the field above!</p>
            </div>
          )
        ) : (
          <div>
            <h3>No to-do's in list</h3>
            <p>Add todos in the field above!</p>
          </div>
        );

      case "done":
        // Primer if, checa si hay to-do's
        return todos.length !== 0 ? (
          // Segundo if, checa si hay to-do's terminados
          todos.filter((t) => t.done === "true").length !== 0 ? (
            <TodoList
              todos={todos.filter((t) => t.done === "true")}
              onToggle={onToggle}
              onDelete={onDelete}
              onFilterChange={onFilterChange}
            ></TodoList>
          ) : (
            <div>
              <h3>No to-do's finished</h3>
              <p>Go to the All or Pending tab to mark tasks as completed!</p>
            </div>
          )
        ) : (
          <div>
            <h3>No to-do's in list</h3>
            <p>Add todos in the field above!</p>
          </div>
        );
      case "all":
        // Primer if, checa si hay to-do's
        // No es necesario un segundo if aqui, ya que en la condición 'all'
        // queremos mostar todas las tareas sin importar su estado.
        return todos.length !== 0 ? (
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDelete={onDelete}
            onFilterChange={onFilterChange}
          ></TodoList>
        ) : (
          <div>
            <h3>No to-do's in list</h3>
            <p>Add todos in the field above!</p>
          </div>
        );
      default:
        // Nuestra condición switch default, que es identica a la condición 'all'
        return todos.length !== 0 ? (
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDelete={onDelete}
            onFilterChange={onFilterChange}
          ></TodoList>
        ) : (
          <div>
            <h3>No to-do's in list</h3>
            <p>Add todos in the field above!</p>
          </div>
        );
    }
  };

  // Esta función cuenta cuantas tareas hay pendientes y cuantas terminadas.
  // Usamos filter para poder contar cuantas tareas cumplen con una de las dos
  // condiciones. Como depende del estado, se actualiza automaticamente cada vez que 
  // cambiamos o agregamos una tarea.
  const taskCount = () => {
    return (
      <div className="count-container">
        <span>{todos.filter((t) => t.done === "false").length} pending / </span>
        <span>{todos.filter((t) => t.done === "true").length} done</span>
      </div>
    );
  };

  // Aqui es la app, mandamos llamar todos nuestros componentes desde aqui. 
  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 TO-DO LIST</h1>
      </header>
      <main className="main-container">
        <div className="container">
          <TodoForm onAdd={createNewTodo}></TodoForm>
          <FilterBar
            filter={activeFilter}
            onFilterChange={onFilterChange}
          ></FilterBar>
          {renderCurrentList()}
          {taskCount()}
        </div>
      </main>
    </div>
  );
}

export default App;
