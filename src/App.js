import React, { useState, useEffect } from 'react';

import './App.css';
import HomeScreen from './Components/HomeScreen';
import CharacterSelect from './Components/CharacterSelect';
import FightScreen from './Components/FightScreen';
import WinningScreen from './Components/WinningScreen';
import BrowsePokemon from './Components/browsePokemon'
function App() {
  const [pokemonImages, setPokemonImages] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('HomeScreen');
  const [selectedPokemon, setSelectedPokemon] = useState({ name: '', image: '' });
  const [berries, setBerries] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState();
  // Function to fetch Pokémon data and update state
  useEffect(() => {
    const fetchPokemon = async () => {
      const images = [];
      const names = [];
      let pokemonData;
      for (let i = 0; i < 20; i++) {
        const randomNum = Math.floor(Math.random() * 800 + 1);
        setRandomPokemon(randomNum);
        const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        pokemonData = await pokemonCharacter.json();

        if (!names.includes(pokemonData.name)) {
          images.push(pokemonData.sprites.front_default);
          names.push(pokemonData.name);
        } else {
          i--;
        }
      }
      console.log(pokemonData);
      setPokemonImages(images);
      setPokemonNames(names);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const fetchBerries = async () => {
      const characterBerries = await fetch(`https://pokeapi.co/api/v2/berry/${randomPokemon}/`);
      const berryData = await characterBerries.json();
      console.log(berryData);
    }
    fetchBerries();
  }, );

  // Handler to store the selected Pokémon and start the fight
  const startFight = (selectedPokemon) => {
    setSelectedPokemon(selectedPokemon); // Store the selected Pokémon (name and image)
    setCurrentScreen('fightScreen');
  };

  // Handler to move from FightScreen to WinningScreen
  const finishFight = () => {
    setCurrentScreen('winningScreen');
  };
  const browsePokemonPage = () =>{
    setCurrentScreen('browsePokemon');
  };
  // Handler to restart the game and go back to CharacterSelect
  const restartGame = () => {
    setSelectedPokemon({ name: '', image: '' }); // Reset the selected Pokémon
    setCurrentScreen('characterSelect');
  };

  const characterSelection = () => {
    setCurrentScreen('characterSelect');
  };


  return (
    <div className="app-container">
      {currentScreen === 'HomeScreen'
        ? <HomeScreen onStart={characterSelection} />
        : currentScreen === 'characterSelect'
        ? <CharacterSelect
            pokemonImages={pokemonImages}
            pokemonNames={pokemonNames}
            onFight={startFight}
            onBrowse={browsePokemonPage} // Pass startFight as a callback
          />
        : currentScreen === 'browsePokemon'
        ? <BrowsePokemon/>
        : currentScreen === 'fightScreen'
        ? <FightScreen selectedPokemon={selectedPokemon} onWin={finishFight} /> // Pass selected Pokémon
        : <WinningScreen selectedPokemon={selectedPokemon} onRestart={restartGame} /> // Pass selected Pokémon to WinningScreen
      }
    </div>
  );
}

export default App;
