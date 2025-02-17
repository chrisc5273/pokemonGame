import React from 'react';

function WinningScreen({ selectedPokemon, onRestart }) {
  return (
    <div className="winning-screen">
      <h2>Congratulations! You won with {selectedPokemon.name}!</h2>
      <img src={selectedPokemon.image} alt={selectedPokemon.name} />
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
}

export default WinningScreen;
