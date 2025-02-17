import React, { useEffect, useState } from 'react';


function Card({ selectedPokemon, onBrowse }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!selectedPokemon.name) return;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`);
        const data = await response.json();
        setPokemonDetails(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  if (!pokemonDetails) return <div>Loading Pokémon Details...</div>;

  return (
    <div>
      <div className="pokemon-card">
        <div className="item1">
          <h2>{pokemonDetails.name.toUpperCase()}</h2>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <p><strong>Height:</strong> {pokemonDetails.height}</p>
          <p><strong>Weight:</strong> {pokemonDetails.weight}</p>
          <p>Base-Stat: {pokemonDetails.stats[0].base_stat}</p>
        </ div>
        <div className="item2">2</div>

        <div className = "item3">
          <h3>Abilities:</h3>
          <ul>
            {pokemonDetails.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className='nextAndPrevious' onClick={onBrowse}>Click Here to Go Back</button>
    </div>
  );
}

export default Card;
