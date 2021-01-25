import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addCard = (e) => {
    e.preventDefault();
    if (firstName && lastName && phone && address) {
      let card = { firstName, lastName, phone, address };
      setCards([...cards, card]);
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
    }
  }

  const renderAddCard = () => {
    return (
      <form className="app__form">
        <div className="app__form-field">
          <div className="app__form-title">First Name</div>
          <input type="text" className="app__form-value" onChange={event => setFirstName(event.target.value)} value={firstName} />
        </div>
        <div className="app__form-field">
          <div className="app__form-title">Last Name</div>
          <input type="text" className="app__form-value" onChange={event => setLastName(event.target.value)} value={lastName} />
        </div>
        <div className="app__form-field">
          <div className="app__form-title">Phone</div>
          <input type="text" className="app__form-value" onChange={event => setPhone(event.target.value)} value={phone} />
        </div>
        <div className="app__form-field">
          <div className="app__form-title">Address</div>
          <input type="text" className="app__form-value" onChange={event => setAddress(event.target.value)} value={address} />
        </div>
        <button type="submit" onClick={addCard} className="app__button">Add Card</button>
      </form>
    );
  }

  const renderShowCards = () => {
    return (
      <ul className="app__cards">
        {
          cards.map((card, index) => {
            return (
              <li key={index} className="app__card">
                <div className="app__card-name">{card.firstName} {card.lastName}</div>
                <div className="app__card-phone">Phone: {card.phone}</div>
                <div className="app__card-address">Address: {card.address}</div>
              </li>
            );
          })
        }
      </ul>
    )
  }

  return (
    <div className="app">
      <h1 className="app__header">Name Card</h1>
      <div className="app__content">
        {renderAddCard()}
        {renderShowCards()}
      </div>
    </div>
  );  
}

export default App;
