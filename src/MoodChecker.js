import React, { useState } from 'react';

const MoodChecker = () => {
  const [mood, setMood] = useState('😊');

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  return (
    <div>
      <h1>What's your current Mood: {mood}</h1>
      <button onClick={() => handleMoodChange('😊')}>Happy</button>
      <button onClick={() => handleMoodChange('😢')}>Sad</button>
      <button onClick={() => handleMoodChange('😡')}>Angry</button>
    </div>
  );
};

export default MoodChecker;
