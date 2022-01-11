import React, { Component } from 'react';
import './App.css'
import Header from "./component/Header"
import Message from "./component/message"
import Button from "./component/Button"
import GridRow from "./component/GridRow"

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentPlayer: 1,
      currentSymbol: "X",
      gameActive: true,
      gameState:[ 
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
  };
}

winningCondition=(gameState,currentSymbol)=>{
  if(this.state.gameState[0][0] === this.state.currentSymbol){
    if(this.state.gameState[0][1] === this.state.currentSymbol && this.state.gameState[0][2]===this.state.currentSymbol)
        return true;
      if(this.state.gameState[1][0] === this.state.currentSymbol && this.state.gameState[2][0]===this.state.currentSymbol)
      return true;
      if(this.state.gameState[1][1] === this.state.currentSymbol && this.state.gameState[2][2]===this.state.currentSymbol)
        return true;
  }
  if(this.state.gameState[1][1] === this.state.currentSymbol){
    if(this.state.gameState[0][1] === this.state.currentSymbol && this.state.gameState[2][1]===this.state.currentSymbol)
        return true;
      if(this.state.gameState[1][0] === this.state.currentSymbol && this.state.gameState[1][2]===this.state.currentSymbol)
      return true;
      if(this.state.gameState[2][0] === this.state.currentSymbol && this.state.gameState[0][2]===this.state.currentSymbol)
        return true;
  }
  if(this.state.gameState[2][2] === this.state.currentSymbol){
    if(this.state.gameState[0][2] === this.state.currentSymbol && this.state.gameState[1][2]===this.state.currentSymbol)
        return true;
      if(this.state.gameState[2][0] === this.state.currentSymbol && this.state.gameState[2][1]===this.state.currentSymbol)
      return true;
  }
  return false;
}

  handleClick = (rowIndex, colIndex)=>{
    if(this.state.gameState[rowIndex][colIndex] === "" && this.state.gameActive) {
    const copiedGameState = [...this.state.gameState];
    copiedGameState[rowIndex][colIndex] = this.state.currentSymbol;
    this.setState({
      gameState: copiedGameState, 
    });
    if(this.winningCondition(rowIndex,colIndex)){
      this.setState({
        gameActive: false,
        currentPlayer: this.state.currentPlayer === 1 ? "Congratulations player 1 wins" : "Congratulations player 2 wins",
      });
      return;
    }
    this.setState({
      currentPlayer: this.state.currentPlayer === 1 ? 2 : 1,
      currentSymbol: this.state.currentSymbol === "X" ? "0" : "X",
    });

  }
};
  
reset=()=>{
  this.setState({
    gameActive: true,
    currentSymbol: "X",
    currentPlayer: 1,
    gameState:[ 
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  });
};

  render() {
    return (
      <>
      <Header />
      <div className="game--container">
        {this.state.gameState.map((row,rowIndex) => (
          <GridRow row={row} rowIndex={rowIndex} handleClick={this.handleClick} />
        ))}
      </div>
        <Message cp={this.state.currentPlayer}/>
        <Button reset={this.reset} />
      </>
    );
  }
}

export default App;