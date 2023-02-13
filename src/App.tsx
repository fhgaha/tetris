import './App.css';
import Game from './components/game/Game';
import Info from './components/info/Info';
import NextPiece from './components/nextPiece/NextPiece';

function App() {
  return (
    <div className="app">
      <Info />
      <Game />
      <NextPiece />
    </div>
  );
}

export default App;
