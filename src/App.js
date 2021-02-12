import React, { useState } from 'react';
import * as _ from 'lodash';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nonValidPhone, setNonValidPhone] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("firstName");

  const addCard = (e) => {
    e.preventDefault();
    if (!nonValidPhone && firstName && lastName && phone && address) {
      let card = { firstName, lastName, phone, address };
      setCards([...cards, card]);
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
    }
  }

  const validatePhone = (value) => {
    let validate = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.][0-9]{3}[-\s\.][0-9]{4}$/im);
    if (!validate) {
      setNonValidPhone("Phone not valid");
    } else {
      setNonValidPhone("");
    }
    setPhone(value);
  }

  const renderAddCard = () => {
    return (
      <form className="app__form">
        <div className="app__form-add">
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
            <input type="text" className="app__form-value" onChange={event => validatePhone(event.target.value)} value={phone} />
            {nonValidPhone && (<div className="app__form-warning">Not Valid Phone!</div>)}
          </div>
          <div className="app__form-field">
            <div className="app__form-title">Address</div>
            <input type="text" className="app__form-value" onChange={event => setAddress(event.target.value)} value={address} />
          </div>
          <button type="submit" onClick={addCard} className="app__button">Add Card</button>
          </div>
        <div>
        <div className="app__form-add">
          <div className="app__form-field">
              <div className="app__form-title">Search</div>
              <input type="text" className="app__form-value" onChange={event => setSearchText(event.target.value)} value={searchText} />
            </div>
            <div className="app__form-field">
              <div className="app__form-title">Sort</div>
              <select onChange={event => setSortBy(event.target.value)} value={sortBy}>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }

  const getCardsFromSearch = () => {
    return cards.filter(card => card.firstName === searchText || card.lastName === searchText);
  }

  const sortCards = () => {
    if (cards.length && sortBy === 'firstName') {
      return _.sortBy(cards, card => card.firstName);
    } else if (cards.length && sortBy === 'lastName') {
      return _.sortBy(cards, card => card.lastName);
    } else {
      return cards;
    }
  }

  const renderShowCards = () => {
    let cardsFromSearch = getCardsFromSearch();
    let showCards = searchText ? cardsFromSearch ? cardsFromSearch : cards : cards;
    let cardsSorted = sortCards(showCards);

    return (
      <ul className="app__cards">
        {
          cardsSorted.map((card, index) => {
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
