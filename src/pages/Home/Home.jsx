import React from "react";

import "./Home.css";

import { Router } from "../../routers/Router";
import { Header, Toast, ToastContainer, ToastsPortal } from "../../components/";

function Home() {
  return (
    <div className="home">
      <Header />
      <Router />
      {/* <Toast /> */}
      <ToastsPortal>
        <ToastContainer />
      </ToastsPortal>
    </div>
  );
}

export { Home };
