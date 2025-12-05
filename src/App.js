import logo from './logo.svg';
import './App.css';
import { Board } from './Board'
import {useState} from "react";

function LoadButton({ setBoard }) {
    const handler = () => {
        let data = JSON.parse(localStorage.getItem('board'))
        setBoard(new Board(data))
    }
    return (
        <button onClick={handler}>
            Load Game
        </button>
    )
}
function SaveButton({ board }) {
  const handler = () => {
      let data = JSON.stringify(board.save())
      localStorage.setItem('board', data)
  }
  return (
      <button onClick={handler}>
        Save Game
      </button>
  )
}

function ResetButton({ setBoard }) {
    return (
        <button onClick={() => setBoard(new Board())}>
            Reset Game
        </button>
    )
}

function WinDisplay({ value }) {
    if(!value) {
        return null
    }
    return (
        <div className="winDisplay">
            The winner is { value }
        </div>
    )
}

function TurnDisplay({ value, disabled }) {
    if(disabled) {
        return null
    }
    return (
        <div className="turnDisplay">
            It's { value }s Turn
        </div>
    )
}

function Column(props) {
    return (
        <div className="column" onClick={props.onClick}>
            {
                props.children
            }
        </div>
    )
}

function Field({ value }) {
    return (
        <div className="field">
            <div className="piece" data-state={ value }></div>
        </div>
    )
}

function BoardView({ board, setBoard, disabled }) {
    return (
        <div className="board">
            <div className="holder"></div>
            {
                board.state.map((column, index) => {
                    function handler() {
                        board.play(index)
                        setBoard(new Board(board.save()))
                    }
                    return (
                        <Column key={index} onClick={disabled ? undefined : handler}>
                            {
                                column.map((value, index) => {
                                    return (
                                        <Field value={value} key={index}/>
                                    )
                                })
                            }
                        </Column>
                    )
                })
            }
            <div className="holder"></div>
        </div>
    )
}

function App() {
  const [board, setBoard] = useState(new Board())
  let winner = board.getWinner()
  return (
    <div className="App">
        <LoadButton setBoard={setBoard}/><SaveButton board={board}/><ResetButton setBoard={setBoard}>Reset</ResetButton>
        <BoardView disabled={!!winner} board={board} setBoard={setBoard}/>
        <TurnDisplay value={board.getTurn()} disabled={!!winner}/>
        <WinDisplay value={winner}/>
    </div>
  );
}

export default App;
