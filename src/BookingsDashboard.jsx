import React, { useEffect, useState } from 'react';
import { listAppointments } from './graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from '@aws-amplify/auth';

const client = generateClient();

function BookingsDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setAuthorized(true);

          const { data } = await client.graphql({
            query: listAppointments
          });

          setAppointments(data.listAppointments.items);
        }
      } catch (error) {
        console.error('Error fetching appointments or auth check:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  if (!authorized) {
    return <p>Access denied. Please log in to view bookings.</p>;
  }

  return (
    <div className="dashboard">
      <h2>Client Bookings</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div className="booking-list">
          {appointments.map((appt) => (
            <div key={appt.id} className="booking-card">
              <p><strong>Name:</strong> {appt.customerName}</p>
              <p><strong>Email:</strong> {appt.email}</p>
              <p><strong>Phone:</strong> {appt.phone}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Style:</strong> {appt.style}</p>
              <p><strong>Notes:</strong> {appt.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsDashboard;
