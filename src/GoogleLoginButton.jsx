// GoogleLoginButton.jsx
import React from "react";
import { supabase } from "./supabaseClient"; // adjust path if needed

function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin} class="bton">
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
