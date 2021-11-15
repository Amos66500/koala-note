import "./App.css";

import { Button } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
//import { Button } from '@material-ui/core';
//import { Html } from "react-konva-utils";
import { StickyNote } from "./components/StickyNote";

export default function App() {
  const [notes, setNotes] = useState([]);
  const stageRef = useRef(null);

  var randomColor = require('randomcolor');

  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState(false);

  const [tool, setTool] = React.useState('eraser');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="Whiteboard">
      {/* <Button
        variant="contained"
        color="primary"
        style={{ width: "80%", height: "60%", color: '#153659', fontWeight: 600 }}
        onClick={
        <StickyNote
          x={50}
          y={50}
          text={text}
          colour={randomColor()}
          onTextChange={(value) => setText(value)}
          width={width}
          height={height}
          selected={selected}
          onTextResize={(newWidth, newHeight) => {
            setWidth(newWidth);
            setHeight(newHeight);
          }}
          onClick={() => {
            setSelected(!selected);
          }}
          onTextClick={(newSelected) => {
            setSelected(newSelected);
          }}
        />
      }
      >
      Sticky Note
      </Button> */}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            setSelected(false);
          }
        }}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          <StickyNote
            x={50}
            y={50}
            text={text}
            colour="#FFF257"
            onTextChange={(value) => setText(value)}
            width={width}
            height={height}
            selected={selected}
            onTextResize={(newWidth, newHeight) => {
              setWidth(newWidth);
              setHeight(newHeight);
            }}
            onClick={() => {
              setSelected(!selected);
            }}
            onTextClick={(newSelected) => {
              setSelected(newSelected);
            }}
          />
  {/*         <Rect
            name="stickyNote"
            x={50}
            y={50}
            width={25}
            height={25}
            fill="yellow"
            draggable
            onDragEnd={(e) => {
              setNotes((prevNotes) => [
                ...prevNotes,
                { x: e.target.x(), y: e.target.y(), fill: randomColor() }
              ]);
              var stage = stageRef.current;
              var stickyNote = stage.findOne(".stickyNote");
              stickyNote.position({ x: 50, y: 50});
            }}
          /> */}
          {notes.map((eachNote, key) => (
            <Rect
              id={key}
              x={eachNote.x}
              y={eachNote.y}
              width={eachNote.width}
              height={eachNote.height}
              fill={eachNote.fill}
              draggable
            />
          ))}
        </Layer>
      </Stage>
      <select className="select"
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
}