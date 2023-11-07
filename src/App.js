import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokeSearch from "./PokeSearch";
import PokemonDetails from "./PokemonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PokeSearch />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
