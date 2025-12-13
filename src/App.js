import './App.css';
import { Board } from './Board'
import { useState, useRef } from 'react';

function LoadButton({ onLoad }) {
    return (
        <button type="button" onClick={onLoad}>
            Load Game
        </button>
    )
}
function SaveButton({ onSave }) {
  return (
      <button type="button" onClick={onSave}>
        Save Game
      </button>
  )
}

function ResetButton({ onReset }) {
    return (
        <button type="button" onClick={onReset}>
            Reset Game
        </button>
    )
}

function UndoButton({ onUndo, disabled }) {
    return (
        <button type="button" disabled={disabled} onClick={onUndo}>
            Undo
        </button>
    )
}

function RedoButton({ onRedo, disabled }) {
    return (
        <button type="button" disabled={disabled} onClick={onRedo}>
            Redo
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

function BoardView({ state, onColumnClick, disabled = false }) {
    return (
        <div className="board">
            <div className="holder"></div>
            <div className="columns">
                {
                    state.map((column, index) => {
                        let handler = () => {
                            onColumnClick(index)
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
            </div>
            <div className="holder"></div>
        </div>
    )
}

function App() {
    const [board, setBoard] = useState(new Board())
    const [boardArray, setBoardArray] = useState([board])
    const index = useRef(0);
    let winner = board.getWinner()
    function onColumnClick(index) {
        const newBoard = new Board(board.save())
        if(newBoard.play(index)) {
            addToBoardArray(newBoard)
        }
    }
    function onLoad() {
        const data = JSON.parse(localStorage.getItem('board'))
        resetBoardArray(new Board(data))
    }
    function onSave() {
        let data = JSON.stringify(board.save())
        localStorage.setItem('board', data)
    }
    function onReset() {
        resetBoardArray(new Board())
    }
    const onUndo = () => {
        if (index.current > 0) {
            index.current = index.current - 1;
            setBoard(boardArray[index.current]);
        }
    };
    const onRedo = () => {
        if (index.current < boardArray.length - 1) {
            index.current = index.current + 1;
            setBoard(boardArray[index.current]);
        }
    };
    const addToBoardArray = (newBoard) => {
        index.current += 1;
        setBoard(newBoard)
        setBoardArray(prev =>
            [...prev.slice(0, index.current), newBoard]
        );
    };
    const resetBoardArray = (newBoard) => {
        index.current = 0
        setBoard(newBoard)
        setBoardArray([newBoard])
    }
    return (
        <div className="App">
            <LoadButton onLoad={onLoad}/>
            <SaveButton onSave={onSave}/>
            <ResetButton onReset={onReset}/>
            <BoardView disabled={!!winner} state={board.state} onColumnClick={onColumnClick}/>
            <UndoButton onUndo={onUndo} disabled={index.current===0 || !!winner}/>
            <RedoButton onRedo={onRedo} disabled={index.current===boardArray.length-1 || !!winner}/>
            <TurnDisplay value={board.getTurn()} disabled={!!winner}/>
            <WinDisplay value={winner}/>
        </div>
    );
}

export default App;
