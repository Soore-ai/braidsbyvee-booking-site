import React from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';

const ProtectedRoute = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== 'authenticated') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>🔒 Admin Login</h2>
        <Authenticator />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
