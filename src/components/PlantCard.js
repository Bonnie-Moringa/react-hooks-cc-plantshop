import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handleSoldOutClick = () => {
    setIsSoldOut(!isSoldOut);
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeletePlant(id));
  };

  const handlePriceChange = () => {
    const newPrice = prompt("Enter the new price:");
    if (newPrice && !isNaN(newPrice)) {
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: parseFloat(newPrice) }),
      })
        .then((r) => r.json())
        .then(onUpdatePlant);
    }
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      {isSoldOut ? (
        <button className="primary" onClick={handleSoldOutClick}>
          Sold Out
        </button>
      ) : (
        <button onClick={handleSoldOutClick}>In Stock</button>
      )}
      <br />
      <button onClick={handlePriceChange}>Edit Price</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
