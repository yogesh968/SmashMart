import React, { useState } from 'react'
import { supabase } from './supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill in both email and password")
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Login error:", error.message)
      alert("Login failed: " + error.message)
    } else {
      console.log("Login success:", data)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div><label id='email'>Email:      </label>
      <input
       class="mepe"
      id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /></div>
     <div><label id ="pass">Password:</label>
      <input
      class="peme"
          id="pass"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /></div>
      <button type="submit"  class="btn">Log In</button>
    </form>
  )
}

export default Login
