import React, { useState, useEffect } from 'react';
import { Text, Line } from "react-konva";
import cryptoRandomString from "crypto-random-string";


function LineText(props) {
  let { points, feet, id } = props;
  let textPoint = 0;
  const [textRef, setTextRef] = useState(React.createRef());

  if (points == null || feet == null) {
    return null
  }

  function isHorizontal(points){
    if (points[0] === points[2]){
      return true
    }
    return false
  }

  const start = [points[0], points[1]]
  const end = [points[2], points[3]]

  // finds where the text should be places
  if (isHorizontal(points)) {
    let x = start[0] + 5;
    let y = (start[1] + end[1]) / 2
    textPoint = [x, y]

    const textH = textRef.textHeight / 2
    textPoint[1] = textPoint[1] - textH
  }else{
    let x = (start[0] + end[0]) / 2
    let y =  start[1] + 5
    textPoint = [x, y]

    const textW = textRef.textWidth / 2
    textPoint[0] = textPoint[0] - textW
  }

  // if no id provided then default to 0
  id = id == null ? 0: id

  return (
      <>
        <Line
          key={id}
          points={points}
          stroke="black"
        />
        <Text
          key={id+'text'}
          text={feet + 'ft'}
          x={textPoint[0]}
          y={textPoint[1]}
          ref={e=> setTextRef(e)}
        />
      </>
  );
    
}

export default LineText;