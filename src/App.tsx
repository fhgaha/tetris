import { useState } from 'react';
import './App.css';
import CRT from './components/crt/CRT';
import Game from './components/game/Game';
import TitleScreen from './components/titleScreen/TitleScreen';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <div className="app">
      <CRT>
        {isGameStarted
          ? <Game />
          : <TitleScreen onStartPressed={() => setIsGameStarted(true)} />
        }
      </CRT>
    </div>
  );
}

export default App;
