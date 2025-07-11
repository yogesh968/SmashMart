import React from 'react'
import { supabase } from './supabaseClient'

export default function Payment() {
  const loadScript = src =>
    new Promise(resolve => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePayment = async () => {
    const isLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!isLoaded) {
      alert('Razorpay SDK failed to load.')
      return
    }

    const session = await supabase.auth.getSession()
    const user = session.data.session?.user
    if (!user) {
      alert('Login first')
      return
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: 50000, // ₹500
      currency: 'INR',
      name: 'Badminton Store',
      description: 'Product Payment',
      handler: async function (response) {
        alert('Payment Successful!')

        // Save payment info
        await supabase.from('payments').insert([
          {
            user_id: user.id,
            email: user.email,
            amount: 500,
            transaction_id: response.razorpay_payment_id,
          },
        ])
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: '#3399cc',
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div>
      <h2>Pay ₹500</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  )
}
