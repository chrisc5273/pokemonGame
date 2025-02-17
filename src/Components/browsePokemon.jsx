import React, { useState, useEffect } from 'react';

function BrowsePokemon() {
    const [pokemonNames, setPokemonNames] = useState([]); // Holds Pokémon names for the current page
    const [images, setImages] = useState([]); // Holds Pokémon images for the current page
    const [page, setPage] = useState(1); // Current page
    const [selectedPokemon, setSelectedPokemon] = useState();
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const selected = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    // Function to fetch Pokémon data for the current page
    const fetchPokemonsForPage = async (page) => {
        setIsLoading(true); // Set loading state to true before starting the fetch
        const pageSize = 25;
        const startIndex = (page - 1) * pageSize + 1; // Start index of the current page
        const endIndex = startIndex + pageSize - 1; // End index of the current page
        const allImages = [];
        const allNames = [];

        // Fetch data for the current page
        for (let i = startIndex; i <= endIndex; i++) {
            const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemonData = await pokemonCharacter.json();

            allImages.push(pokemonData.sprites.front_default); // Store image URL
            allNames.push(pokemonData.name); // Store name
        }

        setImages(allImages); // Save images for the current page
        setPokemonNames(allNames); // Save names for the current page
        setIsLoading(false); // Set loading state to false when fetch is complete
    };

    // Fetch Pokémon data whenever the page changes
    useEffect(() => {
        fetchPokemonsForPage(page);
    }, [page]);

    // Handle Next button click (increment the page)
    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };

    // Handle Previous button click (decrement the page)
    const handlePrevious = () => {
        setPage(prevPage => prevPage - 1);
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
                        {images.map((image, index) => {
                            const isSelected = selectedPokemon === pokemonNames[index];
                            return (
                                <div
                                    key={index}
                                    id={`pokemon-${index}`}
                                    className={`card ${isSelected ? 'selected-pokemon' : ''}`} // Add 'selected-pokemon' class if selected
                                    onClick={() => selected(pokemonNames[index])} // Set the clicked Pokémon
                                >
                                    <img src={image} alt={pokemonNames[index]} className="w-full h-auto" />
                                    <p>{pokemonNames[index]}</p>
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
                        <button onClick={handleNext} className='nextAndPrevious'>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default BrowsePokemon;
