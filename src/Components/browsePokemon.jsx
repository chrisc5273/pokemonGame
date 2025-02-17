import React, { useState, useEffect } from 'react';

function BrowsePokemon() {
    const [pokemonNames, setPokemonNames] = useState([]); // Holds all Pokémon names
    const [images, setImages] = useState([]); // Holds all Pokémon images
    const [page, setPage] = useState(1); // Current page
    const [selectedPokemon, setSelectedPokemon] = useState();
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const selected = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    // Fetch Pokémon data only once
    useEffect(() => {
        const fetchPokemons = async () => {
            setIsLoading(true); // Set loading state to true before starting the fetch
            const allImages = [];
            const allNames = [];
            for (let i = 1; i <= 400; i++) {
                const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const pokemonData = await pokemonCharacter.json();

                allImages.push(pokemonData.sprites.front_default); // Store image URL
                allNames.push(pokemonData.name); // Store name
            }

            setImages(allImages); // Save all images
            setPokemonNames(allNames); // Save all names
            setIsLoading(false); // Set loading state to false when fetch is complete
        };

        fetchPokemons();
    }, []);

    // Function to calculate the subset of Pokémon to display based on the page
    const pageSize = 25; // 5x5 grid = 25 Pokémon per page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentImages = images.slice(startIndex, endIndex);
    const currentNames = pokemonNames.slice(startIndex, endIndex);

    // Handle Next button click (increment the page)
    const handleNext = () => {
        if (endIndex < images.length) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Handle Previous button click (decrement the page)
    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <h1>Pokemon</h1>

            {/* If loading is true, show the loading screen */}
            {isLoading ? (
                <div className="loading-screen">
                    <p>Loading Pokémon...</p>
                    {/* You can add a spinner for better UI */}
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="card-container">
                        {currentImages.map((image, index) => {
                            const isSelected = selectedPokemon === currentNames[index];
                            return (
                                <div
                                    key={startIndex + index}
                                    id={`pokemon-${startIndex + index}`}
                                    className={`card ${isSelected ? 'selected-pokemon' : ''}`} // Add 'selected-pokemon' class if selected
                                    onClick={() => selected(currentNames[index])} // Set the clicked Pokémon
                                >
                                    <img src={image} alt={currentNames[index]} className="w-full h-auto" />
                                    <p>{currentNames[index]}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
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
