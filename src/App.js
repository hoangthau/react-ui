import "./App.css";
import { Tree } from "./components/Tree";
import { TicTacToe } from "./components/TicTacToe";

function App() {
  return (
    <div className="App">
      <h2>Tree</h2>
      <Tree />
      <h2>Tic Tac Toe Game</h2>
      <TicTacToe />
    </div>
  );
}

export default App;
