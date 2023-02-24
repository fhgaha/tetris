import './App.css';
import CRT from './components/crt/CRT';
import Game from './components/game/Game';

function App() {
  return (
    <div className="app">
      <CRT>
        <Game />
      </CRT>
      {/* <Game /> */}
      
    </div>
  );
}

export default App;
