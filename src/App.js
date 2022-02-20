// import logo from './logo.svg';
// import './App.css';
import { useRef, useEffect , useState } from 'react';
import  ColorPicker  from './colorPicker';
function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [colour, setColor] = useState('black');
  const [penSize, setPenSize] = useState(2);
  const [BoardColor , setBoardColor] = useState('white');

  const changeBoardColor = (color) => {
    setBoardColor(color);
  }
  const changeColor = (color) => {
    // console.log(color);
    setColor(color);
  }
  const setSize = (e) => {
    console.log(e.target.value);
    setPenSize(e.target.value);
  }
  // console.log(contextRef)
  useEffect(() => {
    // console.log(colour);
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = colour;
    context.lineWidth = penSize;
    contextRef.current = context;
  },[]);



  useEffect(()=>{
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.strokeStyle = colour;
    context.lineWidth = penSize;
  },[colour,penSize])

  useEffect(() => {
    clearCanvas(BoardColor);
  },[BoardColor])


  const startDrawing = ({nativeEvent})=>{
    // contextRef.current.fillStyle = colour;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    setIsDrawing(true)
  }

  const finishedDrawing = ()=>{
    contextRef.current.closePath();
    setIsDrawing(false)
  }

  const draw = ({nativeEvent})=>{
    if(!isDrawing){
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY);
    contextRef.current.stroke();
  }

  const clearCanvas = (defcolor) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = defcolor;
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  // console.log(color);

  return (
    <div style={{border:"5px solid black"}} className="App">
      <h3 style={{margin:"0"}}>Paint-Board By <a href="https://aryansingh920.github.io/AryanSingh">Aryan Singh</a></h3>
    {/* <ColorPicker/> */}
    <div style={{backgroundColor:"lightgrey",border:"1px solid black",padding:"3px",margin:"2px"}}>
    <h5 style={{display:"inline"}}>Set Colour : </h5>
      <button style={{backgroundColor:"green"}} onClick={()=>changeColor("green")}>Green</button>
      <button style={{backgroundColor:"blue"}} onClick={()=>changeColor("blue")}>Blue</button>
      <button style={{backgroundColor:"red"}} onClick={()=>changeColor("red")}>Red</button>
      <button style={{backgroundColor:"black"}} onClick={()=>changeColor("black")}>Black</button>
      <button style={{backgroundColor:"white"}} onClick={()=>changeColor("white")}>White</button>
      <button style={{backgroundColor:"yellow"}} onClick={()=>changeColor("yellow")}>Yellow</button>
      <button style={{backgroundColor:"orange"}} onClick={()=>changeColor("orange")}>Orange</button>
      <button style={{backgroundColor:"purple"}} onClick={()=>changeColor("purple")}>Purple</button>
      <button style={{backgroundColor:"brown"}} onClick={()=>changeColor("brown")}>Brown</button>
      <button style={{backgroundColor:"pink"}} onClick={()=>changeColor("pink")}>Pink</button>
      <button style={{backgroundColor:"grey"}} onClick={()=>changeColor("grey")}>Grey</button>
      <button style={{backgroundColor:"lightgrey"}} onClick={()=>changeColor("lightgrey")}>Light Grey</button>
      <button style={{backgroundColor:"lightblue"}} onClick={()=>changeColor("lightblue")}>Light Blue</button>
      <button style={{backgroundColor:"lightgreen"}} onClick={()=>changeColor("lightgreen")}>Light Green</button>
      <button style={{backgroundColor:"lightpink"}} onClick={()=>changeColor("lightpink")}>Light Pink</button>
      <button style={{backgroundColor:"lightyellow"}} onClick={()=>changeColor("lightyellow")}>Light Yellow</button>
    </div>
      <label style={{backgroundColor:"lightgrey",border:"1px solid black",padding:"3px",margin:"2px"}}>
      <input style={{margin:"1px"}} type="range" min="2" max="48" placeholder="Enter Pen Size" onChange={(e)=>setSize(e)}/>
      <h5 style={{display:"inline"}}>Size : {penSize}</h5>
      </label>
      <button style={{marginLeft:"1rem"}} onClick={clearCanvas}>Clear the board</button>
      <button onClick={()=>changeBoardColor("white")} style={{margin:"3px"}}>White Board</button>
      <button onClick={()=>changeBoardColor("black")} style={{margin:"3px"}}>Black Board</button>
      <button onClick={()=>changeBoardColor("green")} style={{margin:"3px"}}>Green Board</button>
      <button onClick={()=>changeBoardColor("grey")} style={{margin:"3px"}}>Grey Board</button>
      <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishedDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      />
    </div>
  );
}

export default App;
