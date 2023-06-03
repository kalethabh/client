import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import { setCurrentPage } from "../redux/actions/index";
import "../Pagination/Pagination.css";

function Pagination() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = 12; // Número de pokémon por página

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPagesCount = Math.ceil(pokemons.length / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [pokemons, itemsPerPage]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemons.slice(startIndex, endIndex);
  };

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const renderPokemon = () => {
    const currentPageData = getCurrentPageData();
    return currentPageData.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ));
  };

  // Generar los números de las páginas
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Renderizar el componente principal
  return (
    <div>
      {totalPages > 1 && (
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
      )}
      {renderPokemon()}
    </div>
  );
}

export default Pagination;
