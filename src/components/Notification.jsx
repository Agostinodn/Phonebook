import React from "react";

const Notification = ({ message }) => {
  if (
    message !== null &&
    message.toLowerCase().includes("removed") |
      message.toLowerCase().includes("deleted")
  ) {
    return (
      <>
        <h3 className={"margin-center message error"}>{message}</h3>
      </>
    );
  } else if (message !== null) {
    return (
      <>
        <h3 className={"margin-center message add"}>{message}</h3>
      </>
    );
  } else {
    return <></>;
  }
};

export default Notification;
