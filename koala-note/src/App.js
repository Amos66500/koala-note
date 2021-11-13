import './App.css';

import { Button } from '@material-ui/core';
import { Stage, Layer, Rect, Circle } from 'react-konva';

function App() {

  return (
    <div className="background">
      <Button
        variant="contained"
        color="blue"
        style={{ width: "10%", height: "15%" }}
        onClick= {() => {
        }}
      >
      Create circle
      </Button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect width={50} height={50} fill="red" />
          <Circle
            x={window.innerWidth / 2 - 50}
            y={window.innerHeight / 2 - 25}
            stroke="black"
            radius={50}
            fill="blue"
            draggable={true}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;