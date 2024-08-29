import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import pages from "./utils/pages";
import './App.css';

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Menu() {
  return <h2>Menu</h2>;
}

function Reservations() {
  return <h2>Reservations</h2>;
}

function Orders() {
  return <h2>Orders</h2>;
}

function Login() {
  return <h2>Log In</h2>;
}

function App() {
  return (
    <Router>
      <Header />
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
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
