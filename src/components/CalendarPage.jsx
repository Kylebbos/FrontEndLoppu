import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from '@mui/material/Container';

const CalendarPage = () => {
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

  const events = trainings.map((training) => ({
    id: training.id,
    title: `${training.activity} - ${training.customer.firstname}`,
    start: new Date(training.date),
    end: moment(training.date).add(training.duration, 'minutes').toDate(),
  }));

  const localizer = momentLocalizer(moment);

  return (
    <Container maxWidth="xl" style={{ marginTop: '20px' }}>
      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </Container>
  );
};

export default CalendarPage;
