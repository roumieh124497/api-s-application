import axios from 'axios';
import React, { useState, useEffect } from 'react';
import classes from './SuperHero.module.css';
// https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json
const SuperHero = ({ isActive }) => {
  const [charName, setCharName] = useState('');
  const [charStrength, setStrengthName] = useState('');
  const [charImage, setImageName] = useState('');
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json',
      );
      const number = Math.floor(Math.random() * 200);
      console.log(number);
      setCharName(data.data[number].name);
      setStrengthName(data.data[number].powerstats.strength);
      setImageName(data.data[number].images.md);
    }
    fetchData();
  }, [btn]);
  return (
    <div
      className={classes.mainContainer}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      <h2 className={classes.header}>Super hero</h2>
      <div className={classes.heroContainer}>
        <div>
          <h3>name: {charName}</h3>
          <p>strength: {charStrength}</p>
        </div>
        <img width="150px" height="200px" src={charImage} alt="hero" />
      </div>
      <button onClick={() => setBtn(!btn)}>Who are you?</button>
    </div>
  );
};

export default SuperHero;
