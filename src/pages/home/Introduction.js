import React from "react";
import "./Introduction.css";
// import Button from "../../../components/Button/Button";
import Image from "../../assets/chef.webp";
import { useNavigate } from "react-router-dom";
import pages from "../../utils/pages";

const Introduction = () => {
  const navigate = useNavigate();
  const onClickReserve = () => {
    navigate(pages.get("reservations").path);
  }

  return (
    <div className="introduction-background">
        <div className="introduction">
        <div>
            <h1 className="title">Little Lemon</h1>
            <h2 className="subtitle">Chicago</h2>
            <p>
            Located in the vibrant streets of downtown Chicago,
            The Olive Grove brings a touch of Mediterranean charm to
            the city’s culinary scene. Our carefully crafted menu,
            showcasing savory mezze, wood-fired pizzas, and rich pasta dishes,
            is a celebration of fresh ingredients and timeless flavors.
            </p>
            <button
                type="submit"
                className="button"
                onClick={onClickReserve}>
                Reserve a table
            </button>
            {/* <Button title={"Reserve a table"} onClick={onClickReserve} /> */}
        </div>

        <img
          className="image"
          src={Image}
          alt="Restarurant food"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Introduction;