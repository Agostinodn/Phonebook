import React from "react";

const AddANew = ({
  onSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <div className={"add-new"}>
      <h2>Add a new</h2>
      <form onSubmit={onSubmit}>
        <input value={newName} onChange={handleNameChange} placeholder="name" />
        <input
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="number"
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddANew;
