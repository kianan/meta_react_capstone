import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/logo.svg";
import MenuIcon from "../assets/hamburger.svg";

const Header = () => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "About", link: "/about" },
    { id: 3, label: "Menu", link: "/menu" },
    { id: 4, label: "Reservations", link: "/reservations" },
    { id: 5, label: "Order Online", link: "/orders" },
    { id: 6, label: "Login", link: "/login" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickImage = () => {
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="logo">
        <img src={Logo} alt="logo" height={50} onClick={onClickImage} />
      </div>
      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <ul className={`menu-list ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={item.link} className="link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        <img src={MenuIcon} alt="menu-icon" />
      </div>
    </header>
  );
};

export default Header;