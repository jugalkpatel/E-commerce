import React from "react";

import "./Home.css";

import { Router } from "../../routers/Router";
import { Header, Toast } from "../../components/";

function Home() {
  return (
    <div className="home">
      <Header />
      <Router />
      <Toast />
    </div>
  );
}

export { Home };
