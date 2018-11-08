var newGame = document.getElementsByClassName("new-game")[0]

var initGame = {
  mine: [],
  board: document.getElementById('board'),
  _cellList: [],

  createBoard: function() {
    for (var i = 0; i < 10; i++) {
      var row = document.createElement('div')
      row.classList.add('row')
      row.setAttribute('data-row', String(i))
      for (var j = 0; j < 10; j++) {
        var cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('id', String(i) + String(j))
        this._cellList.push(String(i) + String(j))
        row.appendChild(cell)
      }
      this.board.appendChild(row)
    }
  }, 

  generateMine: function(mine) {
  // generate mine position
    for (var i = 0; i < 30; i++){
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
    this.mine.forEach(function(position) {
      document.getElementById(position).textContent = 'X'
    })
  },

  countNeighboringMine: function() {
    this._cellList.forEach((id, index, list) => {
      const cell = document.getElementById(id)
      let count = 0;
      // check if this position is a mine position
      if(!cell.textContent) {
        if(list[index + 1] && this.mine.find((x) => { return x === list[index + 1]})){
          count++
        }
        if(list[index - 1] && this.mine.find((x) => { return x === list[index - 1]})){
          count++
        }
        if(list[index + 10] && this.mine.find((x) => { return x === list[index + 10]})){
          count++
        }
        if(list[index + 11] && this.mine.find((x) => { return x === list[index + 11]})){
          count++
        }
        if(list[index + 9] && this.mine.find((x) => { return x === list[index + 9]})){
          count++
        }
        if(list[index - 9] && this.mine.find((x) => { return x === list[index - 9]})){
          count++
        }
        if(list[index - 10] && this.mine.find((x) => { return x === list[index - 10]})){
          count++
        }
        if(list[index - 11] && this.mine.find((x) => { return x === list[index - 11]})){
          count++
        }
      cell.textContent = count
      }
    })
  }
}

// generate board and add to board
newGame.addEventListener('click', function(){
  initGame.createBoard();
  initGame.addMine();
  initGame.countNeighboringMine()
})

