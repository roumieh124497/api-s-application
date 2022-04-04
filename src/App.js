import { useState } from 'react';
import Card from './components/layout/Card';
import Weather from './components/Weather';
import Quote from './components/Quote';
import Joke from './components/Joke';
import SuperHero from './components/SuperHero';
import classes from './App.module.css';
import { animated, useSpring } from 'react-spring';
function App() {
  const [weatherActive, setWeatherActive] = useState(true);
  const [jokeActive, setJokeActive] = useState(false);
  const [quoteActive, setQuoteActive] = useState(false);
  const [heroActive, setHeroActive] = useState(false);
  const headerAnimation = useSpring({
    from: { color: '#f76e11' },
    to: async (next, cancel) => {
      while (true) {
        await next({ color: '#B6FFCE' });
        await next({ color: '#FF8080' });
        await next({ color: '#FFF7BC' });
        await next({ color: '#C0EDA6' });
        await next({ color: '#FFA8A8' });
        await next({ color: '#FDD7AA' });
        await next({ color: '#F6FFA4' });
        await next({ color: '#8D8DAA' });
      }
    },
    config: {
      durarion: 600,
    },
    reset: true,
  });
  const dottedAnimation = useSpring({
    from: { background: '#f76e11' },
    to: async (next, cancel) => {
      while (true) {
        await next({ background: '#B6FFCE' });
        await next({ background: '#FF8080' });
        await next({ background: '#FFF7BC' });
        await next({ background: '#C0EDA6' });
        await next({ background: '#FFA8A8' });
        await next({ background: '#FDD7AA' });
        await next({ background: '#F6FFA4' });
        await next({ background: '#8D8DAA' });
      }
    },
    config: {
      durarion: 600,
    },
    reset: true,
  });
  const weatherClickHandler = () => {
    setWeatherActive(true);
    setQuoteActive(false);
    setJokeActive(false);
    setHeroActive(false);
  };
  const quoteClickHandler = () => {
    setWeatherActive(false);
    setQuoteActive(true);
    setJokeActive(false);
    setHeroActive(false);
  };
  const jokeClickHandler = () => {
    setWeatherActive(false);
    setQuoteActive(false);
    setJokeActive(true);
    setHeroActive(false);
  };
  const heroClickHandler = () => {
    setWeatherActive(false);
    setQuoteActive(false);
    setJokeActive(false);
    setHeroActive(true);
  };
  return (
    <>
      <animated.h1 className={classes.header} style={headerAnimation}>
        Api's Application
      </animated.h1>
      <Card>
        <animated.div
          className={classes.dottedBotton}
          style={dottedAnimation}
        ></animated.div>
        <animated.div
          className={classes.dottedTop}
          style={dottedAnimation}
        ></animated.div>
        <div className={classes.appContainers}>
          <Weather isActive={weatherActive} />
          <Quote isActive={quoteActive} />
          <Joke isActive={jokeActive} />
          <SuperHero isActive={heroActive} />
        </div>
        <div className={classes.btnsContainers}>
          <button
            onClick={weatherClickHandler}
            style={{ background: weatherActive ? '#f76e11' : '#f8c3a0' }}
          >
            Weather
          </button>
          <button
            onClick={quoteClickHandler}
            style={{ background: quoteActive ? '#f76e11' : '#f8c3a0' }}
          >
            Quotes
          </button>
          <button
            onClick={jokeClickHandler}
            style={{ background: jokeActive ? '#f76e11' : '#f8c3a0' }}
          >
            Jokes
          </button>
          <button
            onClick={heroClickHandler}
            style={{ background: heroActive ? '#f76e11' : '#f8c3a0' }}
          >
            Superhero
          </button>
        </div>
      </Card>
    </>
  );
}

export default App;
