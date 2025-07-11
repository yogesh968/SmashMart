import React from 'react'
import { supabase } from './supabaseClient'

function Logout() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('Error signing out:', error.message)
    } else {
      console.log('Signed out successfully')
    }
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout;

