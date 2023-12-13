import { useEffect, useState } from 'react';
import './App.css';

let sheetId = '1BIw0A0lpxnuUmT-uRNFM5bzt4fwTeGbkJEdf7q41L4Q';
let sheetTitle = 'form1';

let fulUrl = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetTitle);

function App() {
  const [dataReceived, setDataReceived] = useState({});
  const [state, setState] = useState({});
  const [board, setBoard] = useState([]);

  // pull data
  useEffect(() => {
    const fetchData = async() => {
      fetch(fulUrl)
      .then(res => res.text())
      .then(rep => {
        let list = [];
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        let list1 = data.table.rows.map((ele) => ele.c);

        for (let row of list1) {
          row = row.filter((e) => e !== null && e !== undefined);
          let temp = row.map((e) => e.v);
          temp = temp.filter(e => e !== null);
          list.push(temp);
        }
        let newDataReceived = {};
        for (let x of list){
          if (newDataReceived[x[1]] === undefined){newDataReceived[x[1]] = {}}
          newDataReceived[x[1]].name = x[0];
          if (newDataReceived[x[1]].time === undefined){newDataReceived[x[1]].time = []}
          newDataReceived[x[1]].time.push(x[2]);
        }
        setDataReceived(newDataReceived);
      })
    }
    fetchData();
    setInterval(fetchData, 5000);
  }, []);
  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(dataReceived)){
      setState(dataReceived);
    }
  }, [dataReceived]);  
  useEffect(() => {
    const newBoard = [];
    for (let id in state){
      let timeIn = "";
      let timeOut = "";
      if (state[id].time.length % 2 === 0){
        timeIn = state[id].time[state[id].time.length-2];
        timeOut = state[id].time[state[id].time.length-1];
      }
      else{
        timeIn = state[id].time[state[id].time.length-1];
        timeOut = "---";
      }
      newBoard.push(
        <tr key={id}>
          <td className='name'>{state[id].name}</td>
          <td className='id'>{id}</td>
          <td className='timeIn'>{timeIn}</td>
          <td className='timeOut'>{timeOut}</td>
        </tr>
      )
    }
    setBoard(newBoard);
  }, [state]);


  const handleClickAll = () => {
    const newBoard = [];
    for (let id in state){
      let timeIn = "";
      let timeOut = "";
      if (state[id].time.length % 2 === 0){
        timeIn = state[id].time[state[id].time.length-2];
        timeOut = state[id].time[state[id].time.length-1];
      }
      else{
        timeIn = state[id].time[state[id].time.length-1];
        timeOut = "---";
      }
      newBoard.push(
        <tr key={id}>
          <td>{state[id].name}</td>
          <td>{id}</td>
          <td>{timeIn}</td>
          <td>{timeOut}</td>
        </tr>
      )
    }
    setBoard(newBoard);
  }
  const handleClickActive = () => {
    const newBoard = [];
    for (let id in state){
      let timeIn = "";
      let timeOut = "";
      if (state[id].time.length % 2 === 0){
        continue;
      }
      else{
        timeIn = state[id].time[state[id].time.length-1];
        timeOut = "---";
      }
      newBoard.push(
        <tr key={id}>
          <td>{state[id].name}</td>
          <td>{id}</td>
          <td>{timeIn}</td>
          <td>{timeOut}</td>
        </tr>
      )
    }
    setBoard(newBoard);
  }
  const handleClickLeft = () => {
    const newBoard = [];
    for (let id in state){
      let timeIn = "";
      let timeOut = "";
      if (state[id].time.length % 2 === 0){
        timeIn = state[id].time[state[id].time.length-2];
        timeOut = state[id].time[state[id].time.length-1];
      }
      else{
        continue;
      }
      newBoard.push(
        <tr key={id}>
          <td>{state[id].name}</td>
          <td>{id}</td>
          <td>{timeIn}</td>
          <td>{timeOut}</td>
        </tr>
      )
    }

    setBoard(newBoard);
  }

  return (
    <div id="App">
      <div id='container'>
        <div id='header'><h1>BBLab</h1></div>
        <div id='buttons'>
          <button onClick={()=>handleClickAll()}>All</button>
          <button onClick={()=>handleClickActive()}>Active</button>
          <button onClick={()=>handleClickLeft()}>Have left</button>
        </div>
        <div id='board'>
          <table>
            <tbody>
            <tr>
                <td><strong>Name</strong></td>
                <td><strong>Id</strong></td>
                <td><strong>Time In</strong></td>
                <td><strong>Time Out</strong></td>
              </tr>
              {board}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
