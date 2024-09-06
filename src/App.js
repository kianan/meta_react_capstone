import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import pages from "./utils/pages";
import './App.css';
import Reservations from "./pages/reservations/Reservations";
import ConfirmedReservation from './pages/reservations/ConfirmedReservation';
import UnderConstruction from './pages/construction/UnderConstruction';
import Home from './pages/home/Home';


function About() {
  return <UnderConstruction />;
}

function Menu() {
  return <UnderConstruction />;
}

function Orders() {
  return <UnderConstruction />;
}

function Login() {
  return <UnderConstruction />;
}

function App() {
  return (
    <Router>
      <Header />
      <React.Fragment>
      <Routes>
        <Route path={pages.get("home").path} element={<Home />} />
        <Route path={pages.get("about").path} element={<About />} />
        <Route path={pages.get("menu").path} element={<Menu />} />
        <Route
            path={pages.get("reservations").path}
            element={<Reservations />}
          />
        <Route path={pages.get("orders").path} element={<Orders />} />
        <Route path={pages.get("login").path} element={<Login />} />
        <Route path={pages.get("confirmedbooking").path} element={<ConfirmedReservation />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </React.Fragment>
      <Footer />
    </Router>
  );
}

export default App;
