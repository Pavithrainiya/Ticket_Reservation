import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ticketReserve.css';

export default function Ticketreservation() {
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [date, setDate] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [editId, setEditId] = useState(null);
  const [amount, setAmount]= useState(170);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3500/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateReservation = async () => {
    const reservationData = {
      name,
      trainNumber,
      date,
      travelClass,
      amount
    };

    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:3500/reservations/${editId}`, reservationData);
        setEditId(null);
      } else {
        await axios.post('http://127.0.0.1:3500/reservations', reservationData);
      }
      fetchReservations();
      setName('');
      setTrainNumber('');
      setDate('');
      setTravelClass('selectClass');
      setAmount ( 170);
      alert('Reservation saved successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to save reservation');
    }
  };
   
  const handleEditReservation = (reservation) => {
    setName(reservation.name);
    setTrainNumber(reservation.trainNumber);
    setDate(reservation.date);
    setTravelClass(reservation.travelClass);
    setEditId(reservation.id);
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://127.0.0.1:3500/reservations/${reservationId}`);
      fetchReservations();
      alert('Reservation deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete reservation');
    }
  };
   const Amountdefine=(e)=>
    {
       setTravelClass(e.target.value);
       if(e.target.value==="Economy")
        {
            setAmount(170);
        }
        else if(e.target.value==="Business")
            {
                setAmount(320);
            }
        else
            {
                setAmount(780);
            }
            fetchReservations();
    }
  return (
    <div  class="main"style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3 >Train Ticket Reservation System</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdateReservation(); }} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Train No</label>
          <input type="text" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Date </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Class </label>
          <select value={travelClass} onChange={Amountdefine} required>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
        <p>Amount to pay : <strong>{amount} /-</strong></p>
        <button type="submit">{editId ? 'Update' : 'Create'} Reservation</button>
       
      </form>
      
      <div class="results">
        {reservations.map((reservation) => (
          <div class="result"key={reservation.id} >
            <p>Name :  <span>{reservation.name}</span></p>
            <p>Train No: <span>{reservation.trainNumber}</span></p>
            <p>Date :<span>{reservation.date}</span></p>
            <p>Class : <span>{reservation.travelClass}</span></p><hr></hr>
            <p>Amount paid:<span> {reservation.amount}</span></p>
            <button onClick={() => handleEditReservation(reservation)} style={{ marginRight: '10px' }}>Edit</button>
            <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
           
          </div>
        ))}
      </div>
    </div>
  );
}
