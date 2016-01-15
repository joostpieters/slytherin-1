import React, {Component} from 'react'
import Cell from './cell.jsx!'
import R from 'ramda'

class Grid extends Component {
  constructor(){
    super()
    this.state = {
      cells : new Array(30).fill('x').map((x, index1) => new Array(30).fill('x').map((y, index2) => {
          return {
            row: index1,
            col: index2
          }
        })
      ),
      snakePos: { row: 0, col: 1},
      snakeLength: 3,
      snakeHistory: [],
      foodPos: { row: 0, col: 3}
    }
  }
  componentWillMount() {
    window.addEventListener("keyup", (e) => {
      this.moveSnake(e.keyCode)
    })
  }
  componentDidUpdate(){
    if(this.checkIfFood()){
      this.consumeFood()
      this.createFood()
    }
  }
  createFood() {
    this.setState({
      foodPos: {
        row: parseInt(Math.random() * 30),
        col: parseInt(Math.random() * 30)
      }
    })
  }
  consumeFood() {
    this.setState({
      snakeLength: this.state.snakeLength + 1
    })
    console.log(this.state.snakeLength)
  }
  checkIfFood(){

    return this.state.snakePos.row === this.state.foodPos.row &&
    this.state.snakePos.col === this.state.foodPos.col

  }
  updateHistory() {
    let blah
    let hist = this.state.snakeHistory
    if (this.state.snakeHistory > this.state.snakeLength) {

      blah = R.remove(0, 1, hist).push(this.state.snakePos)
    } else {
      blah = R.remove(0, 0, hist).push(this.state.snakePos)
    }
    console.log(blah)
    this.setState({
      snakeHistory : blah
    })
  }
  moveSnake(key) {
    this.updateHistory()
    switch (key) {
      case 37:
        this.setState({
          snakePos: {
            row: this.state.snakePos.row,
            col: this.state.snakePos.col - 1
          }
        })

        break;
      case 38:
        this.setState({
          snakePos: {
            row: this.state.snakePos.row - 1,
            col: this.state.snakePos.col
          }
        })

        break;
      case 39:
        this.setState({
          snakePos: {
            row: this.state.snakePos.row,
            col: this.state.snakePos.col + 1
          }
        })

        break;
      case 40:
        this.setState({
          snakePos: {
            row: this.state.snakePos.row + 1,
            col: this.state.snakePos.col
          }
        })

        break;

    }
  }
  render(){
    let grid = []
    this.state.cells.map(x => x.map(y => {
      if (this.state.snakePos.row === y.row && this.state.snakePos.col === y.col) {
        grid.push(<Cell row={y.row} col={y.col} property="snake"/>)
      } else if (this.state.foodPos.row === y.row && this.state.foodPos.col === y.col) {
        grid.push(<Cell row={y.row} col={y.col} property="food"/>)
      } else {
        grid.push(<Cell row={y.row} col={y.col} property="empty"/>)

      }
    }))
    return (
      <div className="grid" onKeyUp={this.moveSnake}>
        {grid}
      </div>
    )
  }
}

export default Grid
