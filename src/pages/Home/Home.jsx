import React from "react";

import "./Home.css";

import { Router } from "../../routers/Router";
import { Header, ToastContainer, ToastsPortal } from "../../components/";

function Home() {
  return (
    <div className="home">
      <Header />
      <Router />
      <ToastsPortal>
        <ToastContainer />
      </ToastsPortal>
    </div>
  );
}

export { Home };
