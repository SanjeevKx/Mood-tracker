import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { format, getDay, addDays } from 'date-fns';
import Status from './Status'
const MoodChecker = ({ onMoodChange }) => {
  const [counts, setCounts] = useState({
    sad: 0,
    angry: 0,
    happy: 0,
    depressed: 0,
  });

  const handleMoodChange = (newMood) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [newMood.toLowerCase()]: prevCounts[newMood.toLowerCase()] + 1,
    }));
    onMoodChange(newMood);
  };

  return (
    <div>
      <h1>What's your current Mood: </h1>
      <button onClick={() => handleMoodChange('happy')}>Happy</button>
      <button onClick={() => handleMoodChange('angry')}>Angry</button>
      <button onClick={() => handleMoodChange('sad')}>Sad</button>
      <button onClick={() => handleMoodChange('depressed')}>Depressed</button>
      <div>
        <h2>Mood Counts</h2>
        <p>Sad: {counts.sad}</p>
        <p>Angry: {counts.angry}</p>
        <p>Happy: {counts.happy}</p>
        <p>Depressed: {counts.depressed}</p>
      </div>
    </div>
  );
};

function App() {
  const currentDate = format(new Date(), 'MMMM d, yyyy'); // Get the current formatted date
  const currentDayIndex = getDay(new Date());

  // Initialize historical mood data from local storage or a backend
  const initialHistoricalData = JSON.parse(localStorage.getItem('historicalMoodData')) || [];

  // Ensure that there's an entry for each day of the week
  const xAxisLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const historicalMoodData = xAxisLabels.map((day, index) => {
    const existingEntry = initialHistoricalData[index];
    return existingEntry
      ? { ...existingEntry, name: day }
      : {
          name: day,
          sad: 0,
          angry: 0,
          happy: 0,
          depressed: 0,
          date: format(addDays(new Date(), -currentDayIndex + index), 'yyyy-MM-dd'),
        };
  });

  const [moodData, setMoodData] = useState(historicalMoodData);

  useEffect(() => {
    localStorage.setItem('historicalMoodData', JSON.stringify(moodData));
  }, [moodData]);

  const handleMoodChange = (newMood) => {
    setMoodData((prevData) =>
      prevData.map((day, index) =>
        index === currentDayIndex
          ? {
              ...day,
              [newMood]: day[newMood] + 1,
            }
          : day
      )
    );
  };

  return (
    <Router>
      <div>
        <MoodChecker onMoodChange={handleMoodChange} />
        <h1>{currentDate}</h1>
        <BarChart
          width={450}
          height={250}
          data={moodData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            type="category"
            interval={0}
            tick={{ fontSize: 11, fontWeight: 'bold' }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sad" stackId="a" fill="#8884d8" />
          <Bar dataKey="angry" stackId="a" fill="#82ca9d" />
          <Bar dataKey="happy" fill="#ffc658" />
          <Bar dataKey="depressed" stackId="a" fill="#ff1040" />
        </BarChart>
        <nav>
          <ul>
            <li>
              <Link to="/status">Status</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/status" element={<Status />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

