import React, { useState, useEffect,useRef } from 'react';
import { Container, Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import './App.css';

import Navbar from "./components/Navbar";

function App() {
  let [canvasNode, setNode] = useState(null)
  
  let isLine, isBox = false;
  let clicks = 0
  let lineCoordinated = [],
      boxCoordinates = [];

  const LINE = 'line'
  const BOX = 'box'

  useEffect(() => {
    console.log("effect is in")
    if (canvasNode !== null) {
      canvasNode.addEventListener('click', handleClick, false);
    }
  },canvasNode)

  function handleClick(e) {
    let c = canvasNode.getContext('2d')
    let point = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop]

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
      console.log("draw")
      let [begin, end] = lineCoordinated
      console.log(begin, end)
      getStraightLine(begin, end)
      c.beginPath()
      c.moveTo(begin[0], begin[1])
      c.lineTo(end[0], end[1])
      c.stroke()
      lineCoordinated.length = 0
    }
  }

  function boxDraw(c, point) {

  }

  function getStraightLine(p1, p2) {
    console.log(p1,p2)
    let xDiff = Math.abs(p1[0] - p2[0]);
    let yDiff = Math.abs(p1[1] - p2[1]);
    xDiff > yDiff ? p2[1] = p1[1] :p2[0] = p1[0]

    console.log(p1,p2)
  }

  return (
    <>
    <Navbar/>  
      <Container textAlign='center'>
            <canvas 
              style={{border: '1px solid black'}} 
              ref={(c) => setNode(c)}
              width="500"
              height="500"
              >
            </canvas>
            
            <Button content='Primary' primary onClick={() => selection(LINE)}>Line</Button>
            <Button content='Primary' primary onClick={() => selection(BOX)}>Box</Button>
      </Container>
    </>
  );
}


export default App;
 