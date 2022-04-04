import React, { useState } from 'react';
import classes from './Joke.module.css';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
const Joke = ({ isActive }) => {
  const [joke, setJoke] = useState('');
  const [jokeAnswer, setJokeAnswer] = useState('');
  const [on, setOn] = useState(false);

  const jokeAnimation = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      await next({ opacity: on ? 1 : 0 });
    },
    config: { duration: 1000 },
  });
  const jokeHandler = () => {
    async function fetchJoke() {
      const data = await axios.get(
        'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/general',
      );

      setJoke(data.data[0].setup);
      setJokeAnswer(data.data[0].punchline);
    }
    fetchJoke();
    setOn(true);
  };
  return (
    <div
      className={classes.mainContainer}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      <h2 className={classes.header}>Dad jokes generator</h2>
      <div className={classes.jokeContiner}>
        <div className={classes.joke}>
          {joke ? <animated.p style={jokeAnimation}>{joke}</animated.p> : ''}
          <br />
          <br />
          {jokeAnswer ? (
            <animated.p style={jokeAnimation}>{jokeAnswer}</animated.p>
          ) : (
            ''
          )}
        </div>
        <button onClick={jokeHandler}>Hear a dad joke</button>
      </div>
    </div>
  );
};

export default Joke;
