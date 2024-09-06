import React from "react";
import "./Promotion.css";
import PromotionCard from "../../components/PromotionCard";
import { useNavigate } from "react-router-dom";
import pages from "../../utils/pages";

const specials = [
    {
        id: 1,
        title: "Herb-Crusted Chicken",
        description:
            "Juicy chicken breast with a crispy herb crust, served with roasted vegetables and garlic mashed potatoes.",
        image:
            "https://peaceloveandlowcarb.com/wp-content/uploads/2022/03/Parmesan-Crusted-Chicken-with-Lemon-Cream-Sauce-21.jpg",
        price: "$18.99",
    },
    {
        id: 2,
        title: "Spicy Tuna Poke Bowl",
        description:
            "Fresh tuna cubes marinated in soy and chili sauce, served over jasmine rice with avocado and edamame.",
        image:
            "https://tworedbowls.com/wp-content/uploads/2013/06/dsc_6928-1024x685.jpg",
        price: "$15.50",
    },
    {
        id: 3,
        title: "Mushroom Risotto",
        description:
            "Creamy Arborio rice with sautéed mushrooms, parmesan, and a touch of white truffle oil.",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8eh2ZHeNa7u29g7FWH_dsrJLBxmSTqxOVJQ&s",
        price: "$19.75",
    },
];

const Promotion = () => {
  const navigate = useNavigate();

  const onClickMenu = () => {
    navigate(pages.get("orders").path);
  };
  return (
    <div className="promotion">
      <div className="header-container">
        <h1 className="promotion-title">Promotions</h1>
      </div>

      <div className="header-list">
        {specials.map((special) => (
          <PromotionCard
            key={special.id}
            title={special.title}
            description={special.description}
            image={special.image}
            price={special.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Promotion;