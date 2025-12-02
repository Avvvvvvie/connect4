class Board {
    static ROWS = 6
    static COLUMNS = 7
    static PLAYER = {
        RED: 'RED',
        BLUE: 'BLUE',
        EMPTY: ''
    }
    constructor(state = undefined) {
        this.state = state ? state : Array(Board.COLUMNS).fill(Board.PLAYER.EMPTY).map(el => Array(Board.ROWS).fill(Board.PLAYER.EMPTY))
    }
    getWinner() {
        function connect4Winner(player, board) {
            for(let x = 0; x < Board.ROWS; x++) {
                for(let y = 0; y < Board.COLUMNS; y++) {
                    if(board.getField(y, x).getState() !== player) continue
                    if(row(player, board, x, y, 1, 1, 1) === 4) return true
                    if(row(player, board, x, y, -1, -1, 1) === 4) return true
                    if(row(player, board, x, y, -1, 1, 1) === 4) return true
                    if(row(player, board, x, y, 1, -1, 1) === 4) return true
                    if(row(player, board, x, y, 0, 1, 1) === 4) return true
                    if(row(player, board, x, y, 1, 0, 1) === 4) return true
                    if(row(player, board, x, y, 0, -1, 1) === 4) return true
                    if(row(player, board, x, y, -1, 0, 1) === 4) return true
                }
            }
            return false
        }

        function row(player, board, x, y, dx, dy, count) {
            if (count === 4) return count
            if(board[x + dx] && board[x + dx][y + dy] && board[x + dx][y + dy] === player) {
                return row(player, board, x + dx, y + dy, dx, dy, count + 1)
            }
            return count
        }

        if(connect4Winner(Board.PLAYER.BLUE, this)) return Board.PLAYER.BLUE
        if(connect4Winner(Board.PLAYER.RED, this)) return Board.PLAYER.RED
        return null
    }
    getTurn() {
        let redCount = 0
        let blueCount = 0
        for(let y = 0; y < Board.COLUMNS; y++) {
            for(let x = 0; x < Board.ROWS; x++) {
                if(this.state[y][x] === Board.PLAYER.BLUE) blueCount++
                else if (this.state[y][x] === Board.PLAYER.RED) redCount++
            }
        }
        if(redCount < blueCount) return Board.PLAYER.RED
        return Board.PLAYER.BLUE
    }
    play(column) {
        let row
        for(row = -1; row < this.state[column].length; row++) {
            if(this.state[column][row] !== Board.PLAYER.EMPTY) break
        }
        if(row === -1) return
        this.state[column][row] = this.getTurn()
    }
    save() {
        return {
            state: this.state
        }
    }
}