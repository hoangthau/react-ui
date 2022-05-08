import "./App.css";
import { Tree } from "./components/Tree";
import { TicTacToe } from "./components/TicTacToe";

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="content-item">
          <h2>Tree</h2>
          <Tree />
        </div>
        <div className="content-item">
          <h2>Tic Tac Toe Game</h2>
          <TicTacToe />
        </div>
      </div>
    </div>
  );
}

export default App;
