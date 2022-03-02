import './App.css';
import { useState } from "react"; 
import Axios from "axios";

function App() {

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [reqParts, setReqParts] = useState("");
  const [comments, setComments] = useState("");

  const [PartList, setPartList] = useState([]);

  const addRequest = () => {
    Axios.post("http://localhost:3001/create", {
      name : name, 
      email : email, 
      reqParts : reqParts,
      comments : comments
    }).then(() => {
      console.log("success");
    });
  };

  const getParts = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setPartList(response.data);
    }); 
  };

  return (
    <div className="App">
      <div className="Info">
        <label>Name:</label>
        <input 
          type="text"
          onChange = {(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input 
        type="text"
          onChange = {(event) => {
            setEmail(event.target.value);
          }} />
        <label>Requested Parts:</label>
        <input
          type="text"
          onChange = {(event) => {
            setReqParts(event.target.value);
          }} />
        <label>Comments:</label>
        <input 
        type="text"
          onChange = {(event) => {
            setComments(event.target.value);
          }} />
        <button onClick={addRequest}> Send Request </button>
      </div>

      <br />
      <div className="Requests">
        <button onClick={getParts}> Show Requests </button>

        {partList.map((val, key) => {
          return <div className="part">
            <h3> {val.name} </h3>
            <h3> {val.age} </h3>
            <h3> {val.country} </h3>
          </div>;
        })}
      </div>
        
    </div>
  );
}

export default App;
