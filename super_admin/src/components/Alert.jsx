/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

// * Icon
import { ReactComponent as SuccessIcon } from "../assets/icon/img_mdisuccesscircle.svg";
import { ReactComponent as AlertIcon } from "../assets/icon/img_mdialertcircle.svg";
import { ReactComponent as CloseIcon } from "../assets/icon/img_mdiclose.svg";

export let showingAlert;

const Alert = () => {
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    showingAlert = {
      info: (text, duration) => {
        setErrorList((state) => [
          ...state,
          { id: new Date().getTime(), message: text, type: "info", duration },
        ]);
      },
      success: (text, duration) => {
        setErrorList((state) => [
          ...state,
          {
            id: new Date().getTime(),
            message: text,
            type: "success",
            duration,
          },
        ]);
      },
      warning: (text, duration) => {
        setErrorList((state) => [
          ...state,
          {
            id: new Date().getTime(),
            message: text,
            type: "warning",
            duration,
          },
        ]);
      },
      error: (text, duration) => {
        setErrorList((state) => [
          ...state,
          { id: new Date().getTime(), message: text, type: "error", duration },
        ]);
      },
    };
  }, []);

  return (
    <div className="alert-container">
      {errorList.map((error, i) => {
        return (
          <AlertBox
            key={`${error.id}_${i}`}
            error={error.type === "error"}
            info={error.type === "info"}
            success={error.type === "success"}
            warning={error.type === "warning"}
            message={error.message}
            duration={error.duration}
          />
        );
      })}
    </div>
  );
};

const AlertBox = ({
  error,
  warning,
  success,
  info,
  message,
  duration = 3000,
}) => {
  const [status, setStatus] = useState("open");

  let timeOutClosing = useRef(null).current;
  let timeOutClosed = useRef(null).current;

  useEffect(() => {
    timeOutClosing = setTimeout(() => {
      setStatus("closing");
    }, duration + 800);

    timeOutClosed = setTimeout(() => {
      setStatus("closed");
    }, duration + 800 * 2);

    return () => {
      if (timeOutClosing) clearTimeout(timeOutClosing);
      if (timeOutClosed) clearTimeout(timeOutClosed);
    };
  }, []);

  useEffect(() => {
    if (status === "closed") {
      clearTimeout(timeOutClosing);
      clearTimeout(timeOutClosed);
    }

    return () => {
      clearTimeout(timeOutClosing);
      clearTimeout(timeOutClosed);
    };
  }, [status]);

  const _renderIcon = () => {
    if (success) {
      return <SuccessIcon />;
    } else {
      return <AlertIcon />;
    }
  };

  return (
    <div
      className={`text-white-A700 bg-green-A700 fixed max-w-[500px] w-[400px] bottom-12 right-6 ${
        status === "closed" && "hidden"
      }`}
    >
      <div className="flex relative items-center px-3 py-5 space-x-2">
        {_renderIcon()}

        <div>{message}</div>

        <div
          className="absolute top-1 right-1 cursor-pointer"
          onClick={() => setStatus("closed")}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default Alert;
