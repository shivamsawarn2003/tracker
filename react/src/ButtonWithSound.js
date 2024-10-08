import React from 'react';

// Import sound files
import clickSound from './assets/click-sound.mp3';  // Adjust the path according to your project structure
import hoverSound from './assets/hover-sound.mp3';

const ButtonWithSound = () => {
  // Function to play sound on hover
  const playHoverSound = () => {
    const hoverAudio = new Audio(hoverSound);
    hoverAudio.play();
  };

  // Function to play sound on click
  const playClickSound = () => {
    const clickAudio = new Audio(clickSound);
    clickAudio.play();
  };

  return (
    <button
      onClick={playClickSound}         // Play sound on click
      onMouseEnter={playHoverSound}     // Play sound on hover
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#1ca9c2',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      Hover and Click Me!
    </button>
  );
};

export default ButtonWithSound;
