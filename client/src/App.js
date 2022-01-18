import './App.css';
import { useState } from "react"; 
import Axios from "axios";

function App() {

  const [name, setName] = useState(""); //empty string is original string
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addPerson = () => {
    Axios.post("http://localhost:3001/create", {
      name : name, 
      age : age, 
      country : country,
    }).then(() => {
      console.log("success");
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
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
        <label>Age:</label>
        <input 
        type="number"
          onChange = {(event) => {
            setAge(event.target.value);
          }} />
        <label>Country:</label>
        <input
          type="text"
          onChange = {(event) => {
            setCountry(event.target.value);
          }}
        />
        <button onClick={addPerson}> Add Employee </button>
      </div>
      <br />
      <div className="employees">
        <button onClick={getEmployees}> Show People </button>

        {employeeList.map((val, key) => {
          return <div className="employee">
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
