import React, {useState, useEffect} from 'react';
import { Container, Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Stage, Layer, Rect, Line } from 'react-konva';
import './App.css';

import LineHelper from './components/LineHelper'

import Navbar from "./components/Navbar";

function App() {
  const [lines, setLines] = useState([])
  const [lineHelper, setLineHelper] = useState([])
  const [isLine, setIsLine] = useState(false)
  const [isBox, setIsBox] = useState(false)
  let canvasState = {
    line: [],
    box: []
  }
  
  let lineCoordinates = [],
      boxCoordinates = [];

  let lineEstimate = [];
  
  const LINE = 'line'
  const BOX = 'box'

  function mouseMove(e) {
    let point = [e.pageX - this.offsetLeft, e.pageY - this.offsetTop]
   
    if (isLine && lineCoordinates.length == 1) {
      //lineHelper(point)
      return
    } else {
      // boxHelper(point)
    }

    // redraw
    // let c = canvasNode.getContext('2d')
    // c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // renderCanvas()
    // console.log("mouseMove")
  }

  function handleClick(e) {
    // let point = [e.evt.layerX - this.offsetLeft, e.evt.pageY - this.offsetTop]
    let stage = e.currentTarget;
    let point = stage.getPointerPosition()
    if (isLine) {
      storeLinePoint(point)
    } else {
      // boxDraw(point)
    }
  }

  function selection(type) {
    switch(type) {
      case LINE:
        setIsLine(true)
        setIsBox(false)
        break
      case BOX:
        setIsBox(true)
        setIsLine(false)
        break
      default:
    }
  }

  function storeLinePoint(point) {
    lineCoordinates.push([point['x'], point['y']])

    if (lineCoordinates.length > 1) {
      let [begin, end] = lineCoordinates
      console.log(begin, end)
      getStraightLine(begin, end)
      console.log(begin, end)
      setLines(lines => [...lines, [...begin, ...end]])
      lineCoordinates.length = 0
      setLineHelper([])
    }
  }

  // gives user immediate feedback on the line draw
  function handleMove(e) {
    console.log(lineCoordinates.length)
    
    if(lineCoordinates.length === 1) {
      let stage = e.currentTarget
      let p2 = stage.getPointerPosition()
      lineEstimate = [...lineCoordinates[0], p2['x'], p2['y']]
      console.log(lineEstimate)
    }
  }

  // takes two points of a line to determine
  // if its vertical or horizontal
  function getStraightLine(p1, p2) {
    let xDiff = Math.abs(p1[0] - p2[0]);
    let yDiff = Math.abs(p1[1] - p2[1]);
    xDiff > yDiff ? p2[1] = p1[1] : p2[0] = p1[0]
  }
  console.log("redraw")
  return (
    <>
    <Navbar/>
      <Container textAlign='center'>
        <Stage width={500} height={500} onClick={handleClick} onMouseMove={handleMove}>
          <Layer>
          
            <LineHelper
              key={lineEstimate}
              points={lineEstimate}
            />
            {lines.map((points, i) => {
              return (
                <Line
                  key={i}
                  points={points}
                  stroke="black"
                />)
              }
            )}
          </Layer>
        </Stage>
            
        <Button content='Primary' primary onClick={() => selection(LINE)}>Line</Button>
        <Button content='Primary' primary onClick={() => selection(BOX)}>Box</Button>
      </Container>
    </>
  );
}


export default App;
 