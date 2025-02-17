import React from 'react';

function HomeScreen({onStart}){
    return (
        <div>
            <h1>Click Here to Start the Game</h1>
                <button className='start-button' onClick={onStart}>Start</button>
        </div>
    );
}

export default HomeScreen;