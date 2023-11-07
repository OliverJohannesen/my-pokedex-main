import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css"; // Import your CSS file

function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    // Fetch the details of the Pokémon with the provided ID and update the state.
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemonDetails(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!pokemonDetails) {
    return <div className="loading">Loading...</div>;
  }

  // Extract the data you need from the pokemonDetails object.
  const { name, types, height, weight, abilities, sprites } = pokemonDetails;

  return (
    <div className="pokemon-details">
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-image">
        <img src={sprites.front_default} alt={name} />
      </div>
      <div className="pokemon-info">
        <h3>Types:</h3>
        <ul>
          {types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
        <h3>Height: {height} decimetres</h3>
        <h3>Weight: {weight} hectograms</h3>
        <h3>Abilities:</h3>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetails;
