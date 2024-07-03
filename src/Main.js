import React, { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Bar } from 'recharts';
import { format, getDay, addDays, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import Status from './Status';

const Main = () => {
  const currentDate = format(new Date(), 'MMMM d, yyyy'); // Get the current formatted date
  const currentDayIndex = getDay(new Date());

  // Initialize historical mood data from local storage or a backend
  const initialHistoricalData = JSON.parse(localStorage.getItem('historicalMoodData')) || [];

  // Ensure that there's an entry for each day of the week
  const xAxisLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const historicalMoodData = xAxisLabels.map((day, index) => {
    const existingEntry = initialHistoricalData.find(entry => entry.name === day);
    return existingEntry
      ? { ...existingEntry }
      : {
          name: day,
          sad: 0,
          angry: 0,
          happy: 0,
          depressed: 0,
        };
  });

  const [moodData, setMoodData] = useState(historicalMoodData);

  useEffect(() => {
    // Remove historical data older than one week
    const updatedMoodData = moodData.filter(entry =>
      differenceInDays(new Date(), new Date(entry.date)) <= 7
    );
    setMoodData(updatedMoodData);

    localStorage.setItem('historicalMoodData', JSON.stringify(updatedMoodData));
  }, [moodData]);

  const handleMoodChange = (newMood) => {
    const updatedMoodData = moodData.map((day, index) =>
      index === currentDayIndex
        ? {
            ...day,
            [newMood]: day[newMood] + 1,
          }
        : day
    );
    setMoodData(updatedMoodData);
  };

  return (
    <div>
      <h1>What's your current mood ?</h1>
      <div>
        {/* Buttons for different moods */}
        <button onClick={() => handleMoodChange('happy')}>Happy</button>
        <button onClick={() => handleMoodChange('angry')}>Angry</button>
        <button onClick={() => handleMoodChange('sad')}>Sad</button>
        <button onClick={() => handleMoodChange('depressed')}>Depressed</button>
      </div>
      <h1>{currentDate}</h1>
      <BarChart
        width={450}
        height={250}
        data={moodData}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" interval={0} tick={{ fontSize: 11, fontWeight: 'bold' }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sad" stackId="a" fill="#8884d8" />
        <Bar dataKey="angry" stackId="a" fill="#82ca9d" />
        <Bar dataKey="happy" fill="#ffc658" />
        <Bar dataKey="depressed" stackId="a" fill="#ff1040" />
      </BarChart>
      {/* Add any other main content here */}
      <nav>
        <ul>
          <li>
            <Link to="/status">Status</Link>
          </li>
        </ul>
      </nav>
      {/* Pass mood counts to the Status component */}
      <Status moodCounts={moodData[currentDayIndex]} />
    </div>
  );
};

export default Main;
