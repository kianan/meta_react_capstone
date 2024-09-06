import React from "react";
import "./PromotionCard.css";

const PromotionCard = ({ title, description, image, price }) => {
    return (
        <div className="promotion-card">
            <div className="promotion-card-image">
                <img src={image} alt="promotion" height={200}></img>
            </div>
            <div className="promotion-card-body">
                <div className="promotion-card-body-header">
                    {/* <div className="promotion-card-body-title-header"> */}
                    <p className="promotion-card-title">{title}</p>
                    <p className="promotion-card-price">{price}</p>
                    {/* </div> */}
                    <p className="promotion-card-description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PromotionCard;