// inside Signup.jsx
import React, { useState } from 'react'
import { supabase } from './supabaseClient'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Email and password are required.")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.log("Signup error:", error.message)
    } else {
      console.log("Signup success:", data)
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <label id='email'>Email:</label>
      <input 
         id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label id='pass'>Password:</label>

      <input
      id='pass'
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit" >Sign Up</button>
    </form>
  )
}

export default SignUp
