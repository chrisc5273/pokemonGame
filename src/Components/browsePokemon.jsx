import React, { useState, useEffect } from 'react';

function BrowsePokemon({ onCardClick }) {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      const newImages = [];
      const newNames = [];

      for (let i = 1; i <= 25; i++) {
        try {
          const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const pokemonData = await pokemonCharacter.json();

          newImages.push(pokemonData.sprites.front_default);
          newNames.push(pokemonData.name);
        } catch (error) {
          console.error(`Error fetching Pokémon with index ${i}:`, error);
        }
      }

      setImages(newImages);
      setPokemonNames(newNames);
      setIsLoading(false);
    };

    fetchPokemons();
  }, [page]);

  return (
    <div>
      <h1>Browse Pokémon</h1>

      {isLoading ? (
        <div>Loading Pokémon...</div>
      ) : (
        <div className="card-container">
          {images.map((image, index) => (
            <div
              key={index}
              className="card"
              onClick={() => onCardClick({ name: pokemonNames[index], image: image })}
            >
              <img src={image} alt={pokemonNames[index]} />
              <p>{pokemonNames[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowsePokemon;
