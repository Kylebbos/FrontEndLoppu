import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { groupBy, sumBy } from 'lodash';

const StatisticsPage = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('http://traineeapp.azurewebsites.net/gettrainings')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error in fetch:', response.status, response.statusText);
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => {
        const modifiedData = data.map((item) => ({
          ...item,
        }));
        setTrainings(modifiedData);
      })
      .catch((err) => console.error(err));
  };

  const groupByActivity = groupBy(trainings, 'activity');

  const activityData = Object.keys(groupByActivity).map((activity) => ({
    activity,
    minutes: sumBy(groupByActivity[activity], 'duration'),
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="activity" />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fontSize: 22
             }}
            >
              Duration in Minutes
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="minutes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default StatisticsPage;
