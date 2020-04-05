import React, { Component } from 'react';
import { Stage, Layer, Rect, Line } from "react-konva";

function LineHelper(props) {
  console.log(props)

  return (
      <>
        <Line
          key={props.key}
          points={props.points}
          stroke="black"
        />
      </>
  );
    
}

export default LineHelper;