import React, { useEffect, useState } from 'react';
import UploadMedia from './UploadMedia';
import Gallery from './Gallery';
import { getCurrentUser, signOut as amplifySignOut } from '@aws-amplify/auth';
import { Link } from 'react-router-dom';

function MediaUploadPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();

        console.log('username:', user.username);
        console.log('loginId:', user.signInDetails?.loginId);

        // ✅ Match your actual Cognito admin credentials here
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

  if (loading) return <p>Loading...</p>;

  if (!authorized) {
    return (
      <div>
        <p>❌ Access denied. You must be signed in as admin.</p>
        <button onClick={async () => {
          try {
            await amplifySignOut({ global: true });
            window.location.href = '/media-upload'; // Force reload & sign-in flow
          } catch (err) {
            console.error('Sign out failed:', err);
          }
        }}>
          Click here to sign out
        </button>
      </div>
    );
  }

  return (
  <div>
    <h2>Admin Upload Page</h2>

    {/* 🔘 Sign Out Button */}
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

    {/* 🔘 View Bookings Button */}
    <Link to="/admin/bookings" className="cta-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
      View Bookings
    </Link>

    {/* 📤 Media upload form */}
    <UploadMedia />

    {/* 🖼️ Gallery display */}
    <Gallery />
  </div>
);
}

export default MediaUploadPage;
