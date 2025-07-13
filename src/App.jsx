import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.js';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import GoogleLoginButton from './GoogleLoginButton.jsx';
import './App.css';  
import './index.css'
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

  const products = [
    {
      name: "Yonex Racket",
      image: "https://m.media-amazon.com/images/I/61mWhzkgzpL._SL1500_.jpg",
      link: "https://www.yonex.com",
    },
    {
      name: "Li-Ning Racket",
      image: "https://m.media-amazon.com/images/I/51QQvqkAe0L._SL1000_.jpg",
      link: "https://www.li-ning.com",
    },
    {
      name: "Badminton Shoes",
      image: "https://m.media-amazon.com/images/I/81RZmrSTpeL._SL1500_.jpg",
      link: "https://www.nike.com",
    },
    {
      name: "Shuttlecocks",
      image: "https://m.media-amazon.com/images/I/61nGuB6i8CL._SL1500_.jpg",
      link: "https://www.amazon.in",
    },
    {
      name: "Grip Pack",
      image: "https://m.media-amazon.com/images/I/81sPEH1DBzL._SL1500_.jpg",
      link: "https://www.flipkart.com",
    },
    {
      name: "Badminton Net",
      image: "https://m.media-amazon.com/images/I/71A1+X-+P7L._SL1500_.jpg",
      link: "https://www.decathlon.in",
    },
    {
      name: "Kit Bag",
      image: "https://m.media-amazon.com/images/I/61QW2rs0toL._SL1500_.jpg",
      link: "https://www.yonex.com",
    },
    {
      name: "Wristbands",
      image: "https://m.media-amazon.com/images/I/61MXojya4XL._SL1200_.jpg",
      link: "https://www.decathlon.in",
    },
    {
      name: "Badminton Socks",
      image: "https://m.media-amazon.com/images/I/71E0TPPoEQL._SL1500_.jpg",
      link: "https://www.amazon.in",
    },
    {
      name: "Headbands",
      image: "https://m.media-amazon.com/images/I/71L3RGChDsL._SL1500_.jpg",
      link: "https://www.flipkart.com",
    },
  ];

  return (
    <div className="app">
      <h1 className="title">Welcome to SmashMart</h1>

      {session ? (
        <>
          <p className="welcome-text">Hello, {session.user.email} 👋</p>

          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-link">
                  View Product
                </a>
              </div>
            ))}
          </div>

          <div className="logout-button">
            <Logout />
          </div>
        </>
      ) : (
        <div className="login-box">
          <Login />

          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
}

export default App;
