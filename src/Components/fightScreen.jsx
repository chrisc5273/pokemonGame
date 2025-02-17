import React from 'react';

function FightScreen({ selectedPokemon, onWin }) {
  return (
    <div className="fight-screen">
      <h2>Fight in Progress!</h2>

      {/* Display the selected Pokémon's name and image */}
      <p>You are fighting with: {selectedPokemon.name}</p>
      <img src={selectedPokemon.image} alt={selectedPokemon.name} />

      <p>Battle is happening...</p>
      <button onClick={onWin}>Finish Fight</button>
    </div>
  );
}

export default FightScreen;
