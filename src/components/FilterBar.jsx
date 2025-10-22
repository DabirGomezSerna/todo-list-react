// Esta función llama la barra de filtros, que solamente son 3 botones que cambian el estado
// del filtro activo
export default function FilterBar({ filter, onFilterChange }) {
  //Each button used to have renderCurrentList on their onClick function, this comment only for future reference, ignore it
  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        {/**
         * Todos los botones tienen un className que se crean con el nombre del
         * filtro activo (all, active, done). Esto se hizo para poder controlar los estilos
         * de cada boton, para que el boton 'activo' se vea diferente a los demás
         */}
        <button
          className={`filter-button-all_${filter}`}
          onClick={() => {
            onFilterChange?.("all");
          }}
        >
          All
        </button>
        <button
          className={`filter-button-active_${filter}`}
          onClick={() => {
            onFilterChange?.("active");
          }}
        >
          Pending
        </button>
        <button
          className={`filter-button-done_${filter}`}
          onClick={() => {
            onFilterChange?.("done");
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
