import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [canvasNode, setNode] = useState(null)
  
  let isLine, isBox = false;
  let lineCoordinated = [],
      boxCoordinates = [];

  const LINE = 'line'
  const BOX = 'box'

  useEffect(() => {
    console.log("effect is in")
    if (canvasNode !== null) {
      canvasNode.width = window.innerWidth/2
      canvasNode.height = window.innerHeight/2
      canvasNode.addEventListener('click', handleClick, false);
    }
  }, [canvasNode])

  function handleClick(e) {
    let c = canvasNode.getContext('2d')
    let point = [e.pageX, e.pageY]
    if (isLine) {
      lineDraw(c, point)
    } else {
      boxDraw(c, point)
    }
    //console.log(e)
    //console.log(canvasNode)
    // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    // c.fillRect(e.pageX, e.pageY, 10, 10)
  }

  function selection(type) {
    switch(type) {
      case LINE:
        isLine = true
        isBox = !isLine
        break
      case BOX:
        isBox = true
        isLine = !isBox
        break
      default:
        console.log("this is default")
    }

    console.log("the boolean value of line is ", isLine)
    console.log("the boolean value of box is ", isBox)
  }


  function lineDraw(c, point) {
    lineCoordinated.push([point[0], point[1]])

    if (lineCoordinated.length > 1) {
      let [begin, end] = lineCoordinated
      console.log(begin, end)
      c.beginPath()
      c.moveTo(begin[0], begin[1])
      c.lineTo(end[0], end[1])
      c.stroke()
      lineCoordinated.length = 0
    }
  }

  function boxDraw(c, point) {

  }

  return (
    <>
    <canvas 
      style={{border: '1px solid black'}} 
      ref={(c) => setNode(c)}>
    </canvas>
    <button onClick={() => selection(LINE)}>Line</button>
    <button onClick={() => selection(BOX)}>Box</button>
    </>
  );
}


export default App;
 