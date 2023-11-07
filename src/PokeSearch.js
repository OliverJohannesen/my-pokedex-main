import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function PokeSearch() {
  const [message, setMessage] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerGrid = 20;

  const getPokemon = (pokemonId) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Pokemon does not exist, check spelling");
        }
      }
    );
  };

  const fetchPokemonData = async () => {
    const startIndex = (currentPage - 1) * itemsPerGrid + 1;
    const endIndex = startIndex + itemsPerGrid;
    const data = [];
    for (let i = startIndex; i < endIndex; i++) {
      try {
        const response = await getPokemon(i);
        data.push({
          id: response.id,
          name: response.name,
          type: response.types[0].type.name,
          image: response.sprites.front_default,
        });
      } catch (error) {
        displayError(error.message);
      }
    }
    setPokemonData(data);
  };

  const displayError = (message) => {
    setMessage(message);
    setPokemonData([]);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setMessage("");
  };

  useEffect(() => {
    fetchPokemonData();
  }, [currentPage]);

  // Filter Pokemon data based on the search term
  const filteredPokemon = pokemonData.filter((pokemon) => {
    return (
      pokemon.id.toString().includes(searchTerm) ||
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="poke-search-container">
      <h1>
        Pokedex <span>{message}</span>
      </h1>
      <div className="nav-buttons top">
        <button onClick={goToPreviousPage}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map((data, index) => (
          <Link to={`/pokemon/${data.id}`} key={index}>
            <div className="pokemon-card">
              <img src={data.image} width="96" height="96" alt="Pokemon" />
              <p>
                Number: <span>{data.id}</span>
              </p>
              <p>
                Name: <span>{data.name}</span>
              </p>
              <p>
                Type: <span>{data.type}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="nav-buttons bottom">
        <button onClick={goToPreviousPage}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default PokeSearch;
