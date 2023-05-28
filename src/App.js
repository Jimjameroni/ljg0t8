import React, { Component }  from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  //Format the button to be a square - with value of 'value'
  return (
    <button 
      className="square"
      onClick={onSquareClick}
      >
      {value}
    </button>);
}

export default function Board() {
  //set if X has the next turn
  const [xIsNext, setXIsNext] = useState(true);

  //squares is the value. setSquares is used to change the value
  const [squares, setSquares] = useState(Array(9).fill(null))

  //click event handler
  function handleClick(i){
    //Check if square already has value - return if true
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"
    }else{
      nextSquares[i] = "O"
    }

    setXIsNext(!xIsNext)
    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }else{
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //boardstate
  return (
    <div>
      <div className='board-row'>
        {/*For each square on the line - Call square*/}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>  
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  )
}

//Winner calculations
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0;i < lines.length; i++) {
    const [a, b, c] = lines[i];
   if (squares[a] === squares[b] && squares[a] === squares[c]){
    return squares[a];
   } 
  }
  return null;
  


}


