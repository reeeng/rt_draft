import React, {useState, useEffect} from 'react';
import { Container, Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Stage, Layer, Rect, Line } from 'react-konva';
import './App.css';

import {LineHelper, StartModal} from './components'

import Navbar from "./components/Navbar";

function App() {
  const [lines, setLines] = useState([])
  const [lineHelper, setLineHelper] = useState([])
  const [lineCoordinates, setLineCoordinates] = useState([])
  const [isLine, setIsLine] = useState(false)
  const [isBox, setIsBox] = useState(false)

  const [clicks, setClicks] = useState(0)
  const [openModal , setOpenModal] = useState(true)
  const [floorSize, setFloorSize] = useState(0)

  let lineEstimate = [];
  
  const LINE = 'line'
  const BOX = 'box'

  function handleClick(e) {
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

  useEffect(() => {
    // if clicks are over 2 then draw
    if(clicks > 1) {
      let [begin, end] = lineCoordinates
      getStraightLine(begin, end)
      const length = getFootLengthBetweenPoints(begin, end)
      setLines(lines => [...lines, {points: [...begin, ...end], feet: length }])
      setLineCoordinates([])
      setClicks(0)
    }
  }, [lineCoordinates, clicks])

  function storeLinePoint(point) {
    setLineCoordinates(lineCoordinates => lineCoordinates.concat([[point['x'], point['y']]]))
    setClicks(clicks => clicks + 1)
  }

  // gives user immediate feedback on the line draw
  function handleMove(e) {
    if(clicks == 1) {
      let stage = e.currentTarget
      let p2 = stage.getPointerPosition()
      if(lineCoordinates.length === 1) {
        let begin = lineCoordinates[0]
        let end = [p2['x'], p2['y']]
        getStraightLine(begin, end)
        setLineHelper([...begin, ...end])
      }
    }
  }

  // takes two points of a line to determine
  // if its vertical or horizontal
  function getStraightLine(p1, p2) {
    let xDiff = Math.abs(p1[0] - p2[0]);
    let yDiff = Math.abs(p1[1] - p2[1]);
    xDiff > yDiff ? p2[1] = p1[1] : p2[0] = p1[0]
  }

  function getFootLengthBetweenPoints(start, end) {
    const [x1, y1] = start
    const [x2, y2] = end

    let pixelDiff = 0
    if (x1 === x2) {
      pixelDiff = Math.abs(y1 - y2)
    }else if (y1 === y2) {
      pixelDiff = Math.abs(x1 - x2)
    }else {
      throw "line should be striaght"
    }

    const lengthPerPixel = floorSize / 500
    return pixelDiff * lengthPerPixel
  }

  console.log("redraw")
  console.log(lines)
  return (
    <>
    <StartModal isOpen={openModal} setIsOpen={setOpenModal} setFloorSize={setFloorSize} floorSize={floorSize} />
    <Navbar/>
      <Container textAlign='center'>
        <Stage width={500} height={500} onClick={handleClick} onMouseMove={handleMove} style={{border : '2px solid black'}}>
          <Layer>
            { lineHelper.length === 4 && clicks === 1 ?
              <LineHelper
                key={1000}
                points={lineHelper}
              /> 
            : null}
            
            {lines.map((line, i) => {
              let points = line.points
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