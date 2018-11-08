var newGame = document.getElementsByClassName("new-game")[0]

// generate board and add to board
newGame.addEventListener('click', function(){
  var board = document.getElementById('board')
  for (var i = 0; i < 10; i++) {
    var row = document.createElement('div')
    row.classList.add('row')
    row.setAttribute('data-row', String(i))
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-position', String(i) + String(j))
      row.appendChild(cell)
    }
    board.appendChild(row)
  }

  // generate mine position
  var mine = [];
  for (var i = 0; i < 20; i++){
    while(true) {
      // only add mine for unique position
      var minePosition = Math.floor(Math.random() * 9) * 10 + Math.floor(Math.random() * 9)
      minePosition = String(minePosition)
      if (!mine.find(function(x) {
        return x === minePosition
      })) {
        mine.push(minePosition)
        break
      }
    }
  }
})