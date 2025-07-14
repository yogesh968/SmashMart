
import React from "react";
import { supabase } from "./supabaseClient";  
import './google.css'

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
      <img src="https://imag.malavida.com/mvimgbig/download-fs/google-go-20419-0.jpg" class="google-img"/> Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
