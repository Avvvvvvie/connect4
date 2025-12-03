export class Board {
    static ROWS = 6
    static COLUMNS = 7
    static PLAYER = {
        RED: 'RED',
        BLUE: 'BLUE',
        EMPTY: ''
    }
    constructor(data = undefined) {
        this.state = data ? data.state : Array(Board.COLUMNS).fill(Board.PLAYER.EMPTY).map(el => Array(Board.ROWS).fill(Board.PLAYER.EMPTY))
    }
    getWinner() {
        function connect4Winner(player, state) {
            for(let y = 0; y < Board.COLUMNS; y++) {
                for(let x = 0; x < Board.ROWS; x++) {
                    if(state[y][x] !== player) continue
                    if(row(player, state, y, x, 1, 1, 1) === 4) return true
                    if(row(player, state, y, x, -1, -1, 1) === 4) return true
                    if(row(player, state, y, x, -1, 1, 1) === 4) return true
                    if(row(player, state, y, x, 1, -1, 1) === 4) return true
                    if(row(player, state, y, x, 0, 1, 1) === 4) return true
                    if(row(player, state, y, x, 1, 0, 1) === 4) return true
                    if(row(player, state, y, x, 0, -1, 1) === 4) return true
                    if(row(player, state, y, x, -1, 0, 1) === 4) return true
                }
            }
            return false
        }

        function row(player, state, y, x, dy, dx, count) {
            if (count === 4) return count
            if(state[y + dy] && state[y + dy][x + dx] && state[y + dy][x + dx] === player) {
                return row(player, state, y + dy, x + dx, dy, dx, count + 1)
            }
            return count
        }

        if(connect4Winner(Board.PLAYER.BLUE, this.state)) {
            return Board.PLAYER.BLUE
        }
        if(connect4Winner(Board.PLAYER.RED, this.state)) {
            return Board.PLAYER.RED
        }
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
        if(!this.state[column]) throw new Error('Column at index ' + column + ' does not exist.')
        let row
        for(row = this.state[column].length - 1; row >= 0; row--) {
            if(this.state[column][row] === Board.PLAYER.EMPTY) {
                this.state[column][row] = this.getTurn()
                return
            }
        }
    }
    save() {
        return {
            state: this.state
        }
    }
}