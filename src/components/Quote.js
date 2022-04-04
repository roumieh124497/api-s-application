import axios from 'axios';
import React, { useState } from 'react';
import classes from './Quote.module.css';
import { animated, useSpring } from 'react-spring';
const Quote = ({ isActive }) => {
  const [quote, setQuote] = useState('');
  const [on, setOn] = useState(false);

  const quoteAnimation = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      await next({ opacity: on ? 1 : 0 });
    },
    config: { duration: 1000 },
  });
  const quoteHandler = () => {
    async function fetchQuote() {
      const data = await axios.get('https://quotable.io/random');
      setQuote(data.data.content);
    }
    fetchQuote();
    setOn(true);
  };

  return (
    <div
      className={classes.mainContainer}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      <h2 className={classes.header}>Quotes generator</h2>
      <div className={classes.qouteContiner}>
        <div className={classes.quote}>
          {quote ? (
            <animated.p style={quoteAnimation}>“{quote}”</animated.p>
          ) : (
            ''
          )}
        </div>
        <button onClick={quoteHandler}>Get a qoute</button>
      </div>
    </div>
  );
};

export default Quote;
