import { useState, useEffect } from 'react';
import './default.scss';
import Card from './components/Card/Card';
import IconButton from './components/IconButton/IconButton';
import { podcasts } from './datas/podcasts';

export default function App() {
  const [theme, setTheme] = useState('light'),
    [activeCard, setActiveCard] = useState(null);
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
  }, []);

  return (
    <div className={`App ${theme}`}>
      <nav>
        <main>
          <h1>
            {activeCard || activeCard === 0
              ? podcasts[activeCard].title
              : "Les podcasts d'Alice"}
          </h1>
          <IconButton
            onClick={() =>
              !activeCard && activeCard !== 0
                ? theme === 'light'
                  ? setTheme('dark')
                  : setTheme('light')
                : setActiveCard(null)
            }
            icon={
              !activeCard && activeCard !== 0
                ? theme === 'light'
                  ? 'dark_mode'
                  : 'light_mode'
                : 'fullscreen_exit'
            }
          />
        </main>
        <p>{(activeCard || activeCard === 0) && 'Par ' + podcasts[activeCard].author}</p>
      </nav>
      <div
        className={`cards_container ${
          (activeCard || activeCard === 0) && 'expanded'
        }`}
      >
        {podcasts.map((podcast, index) => (
          <Card
            key={index}
            id={index}
            setActiveCard={setActiveCard}
            expanded={activeCard || (activeCard === 0 && true)}
            display={!(index === activeCard || (!activeCard && activeCard !== 0)) && 'none'}
          />
        ))}
      </div>
    </div>
  );
}
