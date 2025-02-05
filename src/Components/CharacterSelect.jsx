import React, { useState, useEffect } from 'react';

function CharacterSelect() {
  const [pokemonImages, setPokemonImages] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Function to fetch Pokémon data
  const fetchPokemon = async () => {
    setLoading(true); // Show loading screen during reset
    const images = [];
    const names = [];

    for (let i = 0; i < 20; i++) {
      const randomNum = Math.floor(Math.random() * 800 + 1);
      const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
      const pokemonData = await pokemonCharacter.json();

      if (!names.includes(pokemonData.name)) {
        images.push(pokemonData.sprites.front_default);
        names.push(pokemonData.name);
      } else {
        i--; // Retry if the name is a duplicate
      }
    }

    // Update the state with new Pokémon data
    setPokemonImages(images);
    setPokemonNames(names);
    setLoading(false); // Hide loading screen when done
  };

  // Fetch Pokémon when component mounts
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Reset characters with new Pokémon
  const resetCharacters = () => {
    fetchPokemon();
  };

  // Conditional rendering of loading screen or Pokémon cards
  if (loading) {
    return (
      <div className="loading-screen" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="character-select">
      <h1 style={{fontWeight: '900'}}>Choose Your Character</h1>
      <div className="card-container">
        {pokemonImages.map((image, index) => (
          <div className="card" key={index}>
            <img src={image} alt={`Pokemon ${index + 1}`} />
            <p>{pokemonNames[index]}</p>
          </div>
        ))}
      </div>

      {/* Button to reset and fetch new Pokémon */}
      <button className = 'reset' onClick={resetCharacters}>Reset Characters</button>
    </div>
  );
}

export default CharacterSelect;
