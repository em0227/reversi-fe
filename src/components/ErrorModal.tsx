import React from "react";

type ErrorModalTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
};

const ErrorModal: React.FC<ErrorModalTypes> = ({ setShowModal, message }) => {
  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <p>
          {message ? message : "Something went wrong"}, if it is not a user
          error, please refresh the page and try again.
        </p>
      </div>
    </div>
  );
};

export default ErrorModal;
