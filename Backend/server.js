const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());

let reservations = [];
let currentId = 1;

// Create a new reservation
app.post('/reservations', (req, res) => {
  const { name, trainNumber, date, travelClass,amount } = req.body;
  const newReservation = { id: currentId++, name, trainNumber, date, travelClass, amount};
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});    

// Get all reservations
app.get('/reservations', (req, res) => {
  res.json(reservations);
});

// Update an existing reservation
app.put('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { name, trainNumber, date, travelClass } = req.body;
  const reservationIndex = reservations.findIndex(r => r.id == id);
  
  if (reservationIndex !== -1) {
    reservations[reservationIndex] = { id: parseInt(id), name, trainNumber, date, travelClass };
    res.json(reservations[reservationIndex]);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
});

// Delete a reservation
app.delete('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const reservationIndex = reservations.findIndex(r => r.id == id);
  
  if (reservationIndex !== -1) {
    const deletedReservation = reservations.splice(reservationIndex, 1);
    res.json(deletedReservation[0]);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
