import React, { useEffect, useState } from 'react';
import UploadMedia from './UploadMedia';
import Gallery from './Gallery';
import { getCurrentUser, signOut as amplifySignOut } from '@aws-amplify/auth';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import { listAppointments } from './graphql/queries'; // adjust path if needed

function MediaUploadPage() {
  const [authorized, setAuthorized] = useState(false); // Admin access control
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [appointments, setAppointments] = useState([]); // Store fetched bookings

  // Check if signed-in user is authorized (admin)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();

        console.log('username:', user.username);
        console.log('loginId:', user.signInDetails?.loginId);

        // Admin login validation
        if (
          user.username === 'dvikky' ||
          user.signInDetails?.loginId === 'dvikky46@gmail.com'
        ) {
          setAuthorized(true);
        }
      } catch (err) {
        console.log('User not signed in:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Fetch bookings if authorized
  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const result = await API.graphql({ query: listAppointments });
      const items = result.data.listAppointments.items;

      // Sort by newest first using createdAt timestamp
      const sorted = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAppointments(sorted);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  if (authorized) fetchAppointments();
}, [authorized]);


  // Show loading message while user status is being checked
  if (loading) return <p>Loading...</p>;

  // Block non-admin users
  if (!authorized) {
    return (
      <div>
        <p>❌ Access denied. You must be signed in as admin.</p>
        <button onClick={async () => {
          try {
            await amplifySignOut({ global: true });
            window.location.href = '/media-upload'; // Force sign-in flow
          } catch (err) {
            console.error('Sign out failed:', err);
          }
        }}>
          Click here to sign out
        </button>
      </div>
    );
  }

  // Main admin view
  return (
    <div>
      <h2>Admin Upload Page</h2>

      {/* 🔘 Sign Out */}
      <button onClick={async () => {
        try {
          await amplifySignOut({ global: true });
          window.location.href = '/media-upload';
        } catch (err) {
          console.error('Sign out failed:', err);
        }
      }}>
        Sign Out
      </button>

      {/* 🔘 View Bookings Page (separate route) */}
      <Link to="/admin/bookings" className="cta-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
        View Bookings
      </Link>

      {/* 📤 Media Upload Component */}
      <UploadMedia />

      {/* 🖼️ Gallery Display */}
      <Gallery />

      {/* 📋 Inline Client Bookings */}
      <div>
        <h3>Client Bookings</h3>
        {appointments.map((appt) => (
          <div
            key={appt.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '10px'
            }}
          >
            <p><strong>Name:</strong> {appt.customerName}</p>
            <p><strong>Email:</strong> {appt.email}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Style:</strong> {appt.style}</p>
            <p><strong>Notes:</strong> {appt.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaUploadPage;
