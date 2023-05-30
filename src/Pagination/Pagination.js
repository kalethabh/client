import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "../Pagination/Pagination.css"

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  const itemsPerPage = 12; // Número de pokémon por página

  // Obtener los datos de los pokémon al cargar el componente
  useEffect(() => {
    fetchPokemonData();
  }, []);

  // Obtener los datos de los pokémon
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pokemons/");
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de los pokémon:", error);
    }
  };

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Obtener los pokémon para la página actual
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemonData.slice(startIndex, endIndex);
  };

  const renderPokemon = () => {
    const currentPageData = getCurrentPageData();
    return currentPageData.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ));
  };

  // Obtener el número total de páginas
  const totalPages = Math.ceil(pokemonData.length / itemsPerPage);

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
