import React, { useState } from 'react';

function CharacterSelect({ pokemonImages, pokemonNames, onFight, onBrowse }) {
  const [pokemonSelected, setPokemonSelected] = useState('none');

  // Function to handle selecting a Pokémon
  const handleSelect = (pokemonName) => {
    setPokemonSelected(pokemonName);
  };

  const browsePokemon = (pokemonNames,pokemonImages) => {
    
  };
  return (
    <div className="character-select">
      <button className='mainChoices' onClick = {onBrowse} >Browse Pokemons</button>
      <button className='mainChoices'>Packs</button>
      <button className='mainChoices'>Fight</button>
      {/* <h2>Choose Your Character</h2>
      <div className="card-container">
        {pokemonImages.map((image, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleSelect(pokemonNames[index])}
            style={{
              border: pokemonSelected === pokemonNames[index] ? '2px solid blue' : 'none',
              cursor: 'pointer'
            }}
          >
            <img src={image} alt={pokemonNames[index]} />
            <p>{pokemonNames[index]}</p>
          </div>
        ))}
      </div>
      <p>Selected Pokémon: {pokemonSelected}</p> {/* Display the selected Pokémon */}
      {/* <button
        onClick={() =>
          onFight({
            name: pokemonSelected,
            image: pokemonImages[pokemonNames.indexOf(pokemonSelected)],
          })
        }
      >
        Start Fight!
      </button> */} 
    </div>
  );
}

export default CharacterSelect;
