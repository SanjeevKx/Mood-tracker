import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const Status = ({ moodCounts }) => {
  // Provide default mood counts if moodCounts is undefined
  const defaultMoodCounts = {
    sad: 0,
    angry: 0,
    happy: 0,
    depressed: 0,
  };

  // Data for the radial chart
  const data = [
    {
      name: 'Sad',
      uv: moodCounts?.sad || defaultMoodCounts.sad,
      fill: '#8884d8',
    },
    {
      name: 'Angry',
      uv: moodCounts?.angry || defaultMoodCounts.angry,
      fill: '#83a6ed',
    },
    {
      name: 'Happy',
      uv: moodCounts?.happy || defaultMoodCounts.happy,
      fill: '#8dd1e1',
    },
    {
      name: 'Depressed',
      uv: moodCounts?.depressed || defaultMoodCounts.depressed,
      fill: '#82ca9d',
    },
  ];

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <div>
      <h2>Mood Counts</h2>
      <p>Sad: {moodCounts?.sad || defaultMoodCounts.sad}</p>
      <p>Angry: {moodCounts?.angry || defaultMoodCounts.angry}</p>
      <p>Happy: {moodCounts?.happy || defaultMoodCounts.happy}</p>
      <p>Depressed: {moodCounts?.depressed || defaultMoodCounts.depressed}</p>

      {/* Render the radial chart */}
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Status;
