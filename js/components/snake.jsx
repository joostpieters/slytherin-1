import React, {Component} from 'react'


class Snake extends Component {
  constructor () {
    super()
    this.state = {
      here: true
    }
  }
  render () {
    return (
      <div className="snake"></div>
    )
  }
}

export default Snake
