import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import AddANew from "./components/AddANew";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import numberService from "./services/numbersService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const getData = () => {
    numberService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((e) => console.error(`GET ${e}`));
  };
  useEffect(getData, []);

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the list, do you want to replace him?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const personId = person.id;
        const personName = person.name;
        const personObject = {
          name: newName,
          number: newNumber,
        };
        numberService
          .update(personId, personObject)
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId ? person : newPerson
              )
            );
            getData();
            setMessage(`${personName} was replaced to the list`);
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((e) => {
            console.error(`PUT(update) ${e}`);
            setMessage(`${personName} has already benn removed from server`);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      numberService
        .create(personObject)
        .then((initialPersons) => {
          setPersons(persons.concat(initialPersons));
          setNewName("");
          setNewNumber("");
          getData();
          setMessage(`${personObject.name} was added `);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((e) => console.error(`POST ${e}`));
    }
  };

  const removeNumber = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;

    if (window.confirm(`Delete ${personName} ?`)) {
      numberService.remove(personId);
      setPersons(persons.filter((person) => person.id !== personId));
      setMessage(`${personName} was deleted`);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter placeholder="Search" onChange={handleChange}></Filter>
      <AddANew
        onSubmit={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></AddANew>
      <Notification message={message}></Notification>
      <Numbers
        filteredPersons={filteredPersons}
        removeNumber={removeNumber}
      ></Numbers>
    </div>
  );
};

export default App;
