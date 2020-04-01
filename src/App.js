import React, { useState, useEffect,useRef } from 'react';
import { Container, Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import './App.css';

import Navbar from "./components/Navbar";

function App() {
  let [canvasNode, setNode] = useState(null)

  let canvasState = {
    line: [],
    box: []
  }
  
  let isLine, isBox = false;
  let lineCoordinated = [],
      boxCoordinates = [];

  const LINE = 'line'
  const BOX = 'box'

  useEffect(() => {

    if (canvasNode !== null) {
      // bind event listiners to canvas
      canvasNode.addEventListener('click', handleClick, false);
      canvasNode.addEventListener('mousemove', mouseMove, false);
    }
  }, canvasNode)

  function mouseMove(e) {
    console.log(e)
    let point = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop]
   
    if (isLine && lineCoordinated.length == 1) {
      lineHelper(point)
      return
    } else {
      boxHelper(point)
    }

    // redraw
    let c = canvasNode.getContext('2d')
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    renderCanvas()
    console.log("mouseMove")
  }

  function handleClick(e) {
    let c = canvasNode.getContext('2d')
    let point = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop]

    if (isLine) {
      lineDraw(c, point)
    } else {
      boxDraw(c, point)
    }
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
    }
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
      c.lineWidth = 6;
      c.stroke()
      lineCoordinated.length = 0
      canvasState.line.push([begin, end])
    }
  }

  // gives user immediate feedback on the line draw
  function lineHelper(p2) {
    let c = canvasNode.getContext('2d')
    let p1 = lineCoordinated[0]
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    getStraightLine(p1, p2)
    c.beginPath()
    c.moveTo(p1[0], p1[1])
    c.lineTo(p2[0], p2[1])
    c.lineWidth = 10;
    c.strokeStyle = '#787878'
    c.stroke()
    

    //render the rest of the drawing
    renderCanvas()

  }

  function boxDraw(c, point) {

  }

  // takes two points of a line to determine
  // if its vertical or horizontal
  function getStraightLine(p1, p2) {
    let xDiff = Math.abs(p1[0] - p2[0]);
    let yDiff = Math.abs(p1[1] - p2[1]);
    xDiff > yDiff ? p2[1] = p1[1] :p2[0] = p1[0]
  }


  // uses canvasState Obj to redraw draft
  function renderCanvas() {
    let c = canvasNode.getContext('2d')
    canvasState.line.forEach( line => {
      let [begin, end] = line
      c.beginPath()
      c.moveTo(begin[0], begin[1])
      c.lineTo(end[0], end[1])
      c.lineWidth = 6;
      c.strokeStyle = '#000000'
      c.stroke()
    })

  }

  return (
    <>
    <Navbar/>
      <StartModal /> 
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
 