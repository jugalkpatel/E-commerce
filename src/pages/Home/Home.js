import React from 'react';
import './Home.css';
import { Header } from '../../components/Header/Header';
import { Router } from '../../routers/Router';
import { Toast } from '../../components/Toast/Toast';

function Home() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Toast />
    </div>
  );
}

export default Home;
