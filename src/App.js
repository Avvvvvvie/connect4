import logo from './logo.svg';
import './App.css';

let board = new Board()

function LoadButton() {
    const handler = () => {
        let data = JSON.parse(localStorage.getItem('board'))
        board = new Board(data)
    }
    return (
        <button onClick={handler}>
            Load Game
        </button>
    )
}
function SaveButton() {
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

function WinDisplay() {
    return (
        <div className="winDisplay">

        </div>
    )
}

function TurnDisplay() {
    return (
        <div className="turnDisplay">

        </div>
    )
}

function Column(props) {
    return (
        <div className="column" onClick={handler}>
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

function Board() {
    return (
        <div className="board">
            {
                board.state.forEach((column, index) => {
                    function handler() {
                        board.play(index)
                    }
                    return (
                        <Column onClick={handler}>
                            {
                                column.forEach((value) => {
                                    return (
                                        <Field value={value}/>
                                    )
                                })
                            }
                        </Column>
                    )
                })
            }
        </div>
    )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <LoadButton/><SaveButton/>
        <Board/>
        <TurnDisplay/>
        <WinDisplay/>
    </div>
  );
}

export default App;
