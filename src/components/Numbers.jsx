import React from "react";
import Persons from "./Persons";
const Numbers = ({ filteredPersons, removeNumber }) => {
  return (
    <div className={"flex-center"}>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <Persons
            key={person.id}
            person={person}
            removeNumber={removeNumber}
          ></Persons>
        ))}
      </div>
    </div>
  );
};

export default Numbers;
