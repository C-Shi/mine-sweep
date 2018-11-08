var newGame = document.getElementsByClassName("new-game")[0]
var board = document.getElementById('board')

var initGame = {
  mine: [],
  board: document.getElementById('board'),
  // _cellList is array in array, [[position, displayinfo]]
  _cellList: [],

  getCellList: function() {
    return this._cellList
  },

  createBoard: function() {
    for (var i = 0; i < 10; i++) {
      var row = document.createElement('div')
      row.classList.add('row')
      row.setAttribute('data-row', String(i))
      for (var j = 0; j < 10; j++) {
        var cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('id', String(i) + String(j))
        this._cellList.push([String(i) + String(j)])
        row.appendChild(cell)
      }
      board.appendChild(row)
    }
  }, 

  generateMine: function(mine) {
  // generate mine position
    for (var i = 0; i < 10; i++){
      while(true) {
        // only add mine for unique position
        var minePosition = String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9))
        if (!this.mine.find(function(x) {
          return x === minePosition
        })) {
          this.mine.push(minePosition)
          break
        }
      }
    }
  },

  // this will append mine position to the board and indicate as X
  addMine: function() {
    this.generateMine()
    this.mine.forEach(position => {
      this._cellList[Number(position)][1] = 'X'
    })
  },

  countNeighboringMine: function() {
    console.log(this._cellList)
    this._cellList.forEach((position, index, list) => {
      let count = 0;
      // check if this position is a mine position
      // !position[1] means this position is not occupy by mine
      if(!position[1]) {
        if(list[index + 1] && this.mine.find((x) => { return x === list[index + 1][0]})){
          count++
        }
        if(list[index - 1] && this.mine.find((x) => { return x === list[index - 1][0]})){
          count++
        }
        if(list[index + 10] && this.mine.find((x) => { return x === list[index + 10][0]})){
          count++
        }
        if(list[index + 11] && this.mine.find((x) => { return x === list[index + 11][0]})){
          count++
        }
        if(list[index + 9] && this.mine.find((x) => { return x === list[index + 9][0]})){
          count++
        }
        if(list[index - 9] && this.mine.find((x) => { return x === list[index - 9][0]})){
          count++
        }
        if(list[index - 10] && this.mine.find((x) => { return x === list[index - 10][0]})){
          count++
        }
        if(list[index - 11] && this.mine.find((x) => { return x === list[index - 11][0]})){
          count++
        }
      position[1] = count
      }
    })
  }
}

var gameControl = {
  _cellList: initGame.getCellList(),

  displayCount: function(target) {
    target.textContent = this._cellList[Number(target.id)][1]
    target.classList.add('hit')
    if (target.textContent === '0') {
      const tempArr = [
                       this._cellList[Number(target.id) - 9],
                       this._cellList[Number(target.id) - 10],
                       this._cellList[Number(target.id)] - 11,
                       this._cellList[Number(target.id) - 1],
                       this._cellList[Number(target.id) + 1],
                       this._cellList[Number(target.id) + 9],
                       this._cellList[Number(target.id) + 10],
                       this._cellList[Number(target.id) + 11]
                      ];
      tempArr.forEach(cell => {
        console.log(document.getElementById(cell[0]))
        if (document.getElementById(cell[0])){
          document.getElementById(cell[0]).textContent = cell[1]
          document.getElementById(cell[0]).classList.add('hit')
        }
      })
    }
    this.checkGameOver(target)
  },

  checkGameOver: function(target) {
    if (target.textContent === 'X') {
      alert('Game Over! You Lost')
      this.resetGame()
    }
  },

  resetGame: function() {
    this._cellList = [];
    this.mine = [];
    const resetCell = Array.from(document.getElementsByClassName('cell'));
    resetCell.forEach((cell) => {
      cell.textContent = ''
      cell.classList.remove('hit')
    }) 
  }
}

// generate board and add to board
newGame.addEventListener('click', function(){
  initGame.createBoard();
  initGame.addMine();
  initGame.countNeighboringMine()
})

board.addEventListener('click', function(e) {
  gameControl.displayCount(e.target)
})
