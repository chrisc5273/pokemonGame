// src/App.js
import './App.css';
import React, { useState } from 'react';
import CharacterSelect from './Components/CharacterSelect'; // Import the component

function App() {
  const [showCharacters, setShowCharacters] = useState(false);

  const startGame = () => {
    setShowCharacters(true);
  };

  return (
    <div className="app-container">
      {!showCharacters ? (
        <div className="home-screen">
          <h1>Pokemon Game</h1>
          <button className="start-button" onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <CharacterSelect />  
      )}
    </div>
  );
}

export default App;
