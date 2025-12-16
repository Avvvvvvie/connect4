import { render, screen } from '@testing-library/react';
import App from './App';
import {Board} from './Board';

test('renders buttons', () => {
  render(<App />);
  const loadButton = screen.getByText(/Load Game/i);
  const saveButton = screen.getByText(/Save Game/i);
  const resetButton = screen.getByText(/Reset Game/i);
  expect(loadButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

describe("Detect winner of a Connect4 game", function() {
  function transpose(matrix) {
    return {state: matrix[0].map((col, i) => matrix.map(row => row[i]))};
  }

  it("return false if there is no winner yet", function() {
    const testBoard = new Board(transpose([
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', 'BLUE', '', '' ],
      [ '', '', '', 'RED', 'RED', 'BLUE', 'RED' ],
      [ '', '', 'BLUE', 'RED', 'BLUE', 'RED', 'BLUE' ],
      [ 'RED', 'BLUE', 'BLUE', 'RED', 'BLUE', 'RED', 'BLUE' ]
    ]))

    expect(testBoard.getWinner()).toEqual(null)
  })

  it("return true if there are 4 red pieces in a row", function() {
    const testBoard = new Board(transpose([
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', 'BLUE', '', '' ],
      [ '', '', '', 'RED', 'RED', 'BLUE', 'RED' ],
      [ '', '', 'RED', 'RED', 'RED', 'RED', 'BLUE' ],
      [ 'BLUE', 'BLUE', 'BLUE', 'RED', 'BLUE', 'BLUE', 'BLUE' ]
    ]))
    
    expect(testBoard.getWinner()).toEqual(Board.PLAYER.RED)
  })

  it("return true if there are 4 red pieces in a column", function() {
    const testBoard = new Board(transpose([
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', 'RED', '', '' ],
      [ '', '', '', 'RED', 'RED', 'BLUE', 'BLUE' ],
      [ '', '', 'RED', 'BLUE', 'RED', 'RED', 'BLUE' ],
      [ 'BLUE', 'BLUE', 'BLUE', 'RED', 'RED', 'BLUE', 'BLUE' ]
    ]))
    
    expect(testBoard.getWinner()).toEqual(Board.PLAYER.RED)
  })

  it("return true if there are 4 red pieces diagonally ascending", function() {
    const testBoard = new Board(transpose([
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', 'BLUE', '', 'RED' ],
      [ '', '', '', 'RED', 'RED', 'RED', 'BLUE' ],
      [ '', '', 'RED', 'BLUE', 'RED', 'RED', 'BLUE' ],
      [ 'BLUE', 'BLUE', 'BLUE', 'RED', 'RED', 'BLUE', 'BLUE' ]
    ]))

    expect(testBoard.getWinner()).toEqual(Board.PLAYER.RED)
  })

  it("return true if there are 4 red pieces diagonally descending", function() {
    const testBoard = new Board(transpose([
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', 'RED', 'BLUE', '', 'RED' ],
      [ '', '', '', 'RED', 'RED', 'BLUE', 'BLUE' ],
      [ '', '', 'RED', 'BLUE', 'RED', 'RED', 'BLUE' ],
      [ 'BLUE', 'BLUE', 'BLUE', 'RED', 'RED', 'BLUE', 'RED' ]
    ]))

    expect(testBoard.getWinner()).toEqual(Board.PLAYER.RED)
  })

})
