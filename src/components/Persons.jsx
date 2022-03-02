import React from "react";

const Person = ({ person, removeNumber }) => {
  return (
    <p className={"person"}>
      <span>
        {person.name}
        {": "}
      </span>

      <span>{person.number}</span>
      <span>
        <button onClick={() => removeNumber(person.id)}>Delete</button>
      </span>
    </p>
  );
};

export default Person;
