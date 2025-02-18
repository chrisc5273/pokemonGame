import React, { useState, useEffect } from 'react';
import Card from './Components/Card'; // Make sure Card is imported

function BrowsePokemon() {
  const [pokemonNames, setPokemonNames] = useState([]); // Holds Pokémon names
  const [images, setImages] = useState([]); // Holds Pokémon images
  const [page, setPage] = useState(1); // Current page
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Selected Pokémon
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const pageSize = 25; // 25 Pokémon per page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      const allImages = [];
      const allNames = [];

      for (let i = 1; i <= 400; i++) {
        try {
          const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const pokemonData = await pokemonCharacter.json();
          allImages.push(pokemonData.sprites.front_default); // Store image URL
          allNames.push(pokemonData.name); // Store name
        } catch (error) {
          console.error(`Error fetching Pokémon with index ${i}:`, error);
        }
      }
      setImages(allImages); // Save images
      setPokemonNames(allNames); // Save names
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);

  // Handle Next button
  const handleNext = () => {
    if (endIndex < images.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Handle Previous button
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  // Handle Pokémon card click
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon); // Set the selected Pokémon
  };

  // Handle going back to the browse page
  const handleBrowse = () => {
    setSelectedPokemon(null); // Deselect Pokémon
  };

  // Get current set of Pokémon based on page
  const currentImages = images.slice(startIndex, endIndex);
  const currentNames = pokemonNames.slice(startIndex, endIndex);

  // If a Pokémon is selected, show the Card component
  if (selectedPokemon) {
    return <Card selectedPokemon={selectedPokemon} onBrowse={handleBrowse} />;
  }

  return (
    <div>
      <h1>Browse Pokémon</h1>
      {isLoading ? (
        <div>Loading Pokémon...</div>
      ) : (
        <>
          <div className="card-container">
            {currentImages.map((image, index) => {
              return (
                <div
                  key={startIndex + index}
                  className="card"
                  onClick={() =>
                    handleCardClick({
                      name: pokemonNames[startIndex + index],
                      image: image
                    })
                  }
                >
                  <img src={image} alt={currentNames[index]} />
                  <p>{currentNames[index]}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            {page > 1 && (
              <button onClick={handlePrevious} className='nextAndPrevious'>
                Previous
              </button>
            )}
            {endIndex < images.length && (
              <button onClick={handleNext} className='nextAndPrevious'>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BrowsePokemon;
