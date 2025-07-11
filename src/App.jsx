import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.js';
import Login from './Login.jsx';
// import SignUp from './Signup.jsx';
import Logout from './Logout.jsx';
import GoogleLoginButton from './GoogleLoginButton.jsx'; // adjust path

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div class="hyota">
      <h1>Welcome to SmashMart</h1>
      {session ? (
        <>
          <p>Welcome To my SmashMart, {session.user.email}</p>
          



          <Logout />
        </>
      ) : (
        <>
          <Login />

          <GoogleLoginButton />
        </>
      )}
    </div>
  );
}

export default App;
