import React, { useState } from "react";
import Card from "../Card/Card";
import "../Pagination/Pagination.css";
import { useSelector } from "react-redux";

function Pagination() {
  const pokemons = useSelector((state) => state.pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Número de pokémon por página

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemons.slice(startIndex, endIndex);
  };

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPokemon = () => {
    const currentPageData = getCurrentPageData();
    return currentPageData.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ));
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  // Generar los números de las páginas
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Renderizar el componente principal
  return (
    <div>
      <div className="page-numbers">
        {/* Renderizar los números de las páginas como botones */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {renderPokemon()}
    </div>
  );
}

export default Pagination;
