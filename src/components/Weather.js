import React, { useEffect, useRef, useState } from 'react';
import classes from './Weather.module.css';
import axios from 'axios';
import { animated, useSpring } from 'react-spring';
const Weather = ({ isActive }) => {
  const [loading, setLoading] = useState(true);
  const tempAnimation = useSpring({
    from: { margin: '0px' },
    to: async (next, cancel) => {
      while (true) {
        await next({ marginTop: '15px' });
        await next({ marginTop: '0px' });
        await next({ marginBotton: '15px' });
        await next({ marginBotton: '0px' });
      }
    },
    config: {
      duration: 500,
    },
  });
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const weatherRef = useRef('');
  const weatherSubmitHandler = e => {
    e.preventDefault();
    setCity(weatherRef.current.value);
  };
  useEffect(() => {
    async function fetchdata() {
      try {
        if (city) {
          const data = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=09197d3ecaa2ae40da3f41c1f483a977`,
          );
          setTemp(data.data.main.temp);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchdata();
  }, [city]);
  return (
    <div
      className={classes.mainContainer}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      <h2>Weather App</h2>
      <div className={classes.degreeContainer}>
        {temp ? (
          <animated.p style={tempAnimation}>{temp} C</animated.p>
        ) : (
          <p></p>
        )}
      </div>
      <form onSubmit={weatherSubmitHandler} className={classes.formContainer}>
        <label htmlFor="city">City name</label>
        <input id="city" placeholder="wrtie your city name" ref={weatherRef} />
        <button>Done</button>
      </form>
    </div>
  );
};

export default Weather;
