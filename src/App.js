import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import HomePage from './HomePage';
import Navbar from './navbar';
import Gallery from './Gallery';
import './styles.css';
import MediaUploadPage from './MediaUploadPage';
import BookingsDashboard from './BookingsDashboard';
import ProtectedRoute from './ProtectedRoute'; // ✅ Add this

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [style, setStyle] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const FORMSPREE_URL = 'https://formspree.io/f/xrbknzvg';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, style, date, phone, time, notes };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setStyle('');
        setDate('');
        setPhone('');
        setTime('');
        setNotes('');
      } else {
        alert('❌ Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Error sending form:', err);
      alert('❌ An error occurred.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="booking-container success-screen">
        <h2>🎉 Success!</h2>
        <p>Your appointment has been booked. A confirmation email has been sent to you.</p>
        <button className="submit-button" onClick={() => setIsSubmitted(false)}>
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h2>Book Your Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Name:</label><input value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div className="form-group"><label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="form-group"><label>Style:</label><input value={style} onChange={(e) => setStyle(e.target.value)} required /></div>
        <div className="form-group"><label>Date:</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div className="form-group"><label>Phone:</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
        <div className="form-group"><label>Time:</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} required /></div>
        <div className="form-group"><label>Notes (optional):</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" /></div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/media-upload" element={<ProtectedRoute><MediaUploadPage /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><BookingsDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
