import React from "react";

const Filter = ({ placeholder, onChange }) => {
  return (
    <div className={"phonebook"}>
      <h2>Phonebook</h2>
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Filter;
