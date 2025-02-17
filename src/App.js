import React, { useState } from 'react';
import './App.css';
import HomeScreen from './Components/HomeScreen';
import CharacterSelect from './Components/CharacterSelect';
import FightScreen from './Components/FightScreen';
import WinningScreen from './Components/WinningScreen';
import BrowsePokemon from './Components/browsePokemon';
import Card from './Components/card';

function App() {
  const [currentScreen, setCurrentScreen] = useState('HomeScreen');
  const [selectedPokemon, setSelectedPokemon] = useState({ name: '', image: '' });

  // Handler to store the selected Pokémon and start the fight
  const startFight = (selectedPokemon) => {
    setSelectedPokemon(selectedPokemon); // Store the selected Pokémon (name and image)
    setCurrentScreen('fightScreen');
  };

  // Handler to move from FightScreen to WinningScreen
  const finishFight = () => {
    setCurrentScreen('winningScreen');
  };

  // Change screen to browse Pokémon
  const browsePokemonPage = () => {
    setSelectedPokemon({ name: '', image: '' }); // Reset the selected Pokémon when going back to browse
    setCurrentScreen('browsePokemon');
  };

  // Handler to restart the game and go back to CharacterSelect
  const restartGame = () => {
    setSelectedPokemon({ name: '', image: '' });
    setCurrentScreen('characterSelect');
  };

  const characterSelection = () => {
    setCurrentScreen('characterSelect');
  };

  // This is where we handle selecting a Pokémon and showing the Card component
  const descriptiveCard = (pokemon) => {
    setSelectedPokemon(pokemon); // Set the selected Pokémon
    setCurrentScreen('card'); // Change the screen to show the Card component
  };

  return (
    <div className="app-container">
      {currentScreen === 'HomeScreen' ? (
        <HomeScreen onStart={characterSelection} />
      ) : currentScreen === 'characterSelect' ? (
        <CharacterSelect onFight={startFight} onBrowse={browsePokemonPage} />
      ) : currentScreen === 'browsePokemon' ? (
        <BrowsePokemon onCardClick={descriptiveCard} />
      ) : currentScreen === 'card' ? (
        <Card selectedPokemon={selectedPokemon} onBrowse={browsePokemonPage} /> 
      ) : currentScreen === 'fightScreen' ? (
        <FightScreen selectedPokemon={selectedPokemon} onWin={finishFight} />
      ) : currentScreen === 'winningScreen' ? (
        <WinningScreen selectedPokemon={selectedPokemon} onRestart={restartGame} />
      ) : null}
    </div>
  );
}

export default App;
