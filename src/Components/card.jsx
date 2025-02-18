import React, { useEffect, useState } from 'react';

function Card({ selectedPokemon, onBrowse }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [habitatDetails, setHabitatDetails] = useState('');
  const [speciesDetails, setSpeciesDetails] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!selectedPokemon.name) return;

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`);
        const data = await response.json();
        setPokemonDetails(data);
        // Fetch all ability details in parallel
        const abilityPromises = data.abilities.map(async (ability) => {
          const response2 = await fetch(ability.ability.url); // Use the provided ability URL directly
          const abilityData = await response2.json();

          // Filter for English ability effect
          const englishEffect = abilityData.effect_entries.find(entry => entry.language.name === 'en');
          return englishEffect ? englishEffect.effect : "No English effect available";
        });

        // Wait for all ability details to be fetched
        const abilitiesData = await Promise.all(abilityPromises);
        setAbilityDetails(abilitiesData); // Store all fetched ability data

        const response3 = await fetch(data.species.url);
        const speciesData = await response3.json();

        console.log(speciesData);
        if (speciesData.habitat) {
          const response4 = await fetch(speciesData.habitat.url);
          const habitatData = await response4.json();
          setHabitatDetails(habitatData.name);
        }

      } catch (error) {
        console.error('Error fetching Pokémon details or abilities:', error);
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  if (!pokemonDetails) return <div>Loading Pokémon Details...</div>;

  return (
    <div>

      <div className="pokemon-card">
        <div className='header'><h1>{pokemonDetails.name.toUpperCase()}</h1></div>
        <div className="item1"
          style={{
            backgroundImage: `url(${pokemonDetails.sprites.other['official-artwork'].front_default})`,
            backgroundSize: '400px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
        </div>
        <div className='item2'>
        
            <div style={{textAlign: 'center'}}>
            <p>Height: {pokemonDetails.height}ft</p>
            <p>Weight: {pokemonDetails.weight}lb</p>
            <p>Base-Stat: {pokemonDetails.stats[0].base_stat}hp</p>
            <p>Habitat: {habitatDetails}</p><br />
            
            {/* Check if held_items is available and not empty */}
            <p style={{ textDecoration: 'underline', fontWeight: 'bolder' }}>Items this Pokemon can have</p>
            {pokemonDetails.held_items.length > 0 ? (
              <ul>
                {pokemonDetails.held_items.map((item, index) => (
                  <li key={index}><p>{item.item.name}</p></li>
                ))}
              </ul>
            ) : (
              <p>No held items available</p>
            )}
          </div>
          <div>

          </div>
        </div>

        <div className="item3">
          <h4 style={{ textDecoration: 'underline' }}>Abilities</h4>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={ability.ability.name}>
                <h3 style={{ fontWeight: 'Bold' }}>{ability.ability.name.toUpperCase()}</h3>
                <p>{abilityDetails[index]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className='nextAndPrevious' onClick={onBrowse}>Click Here to Go Back</button>
    </div>
  );
}

export default Card;
