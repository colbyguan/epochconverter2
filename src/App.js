import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CopyableRow from "./components/CopyableRow";
import { timeStringToOffset } from "./helpers";

const UNIT_OPTIONS = ['both', 'millis', 'seconds']
const REALTIME_OPTIONS = ['page load', 'realtime']

function App() {
  // Time values
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);

  // Options
  const [unitOption, setUnitOption] = useState(0)
  const [realtimeOption, setRealtimeOption] = useState(0)

  // Animation
  const [toast, setToast] = useState("hello");
  const [toastColor, setToastColor] = useState("white");
  const [toastFade, setToastFade] = useState(false);
  const [toastMove, setToastMove] = useState(false);
  let [timeouts, setTimeouts] = useState([]);
  
  const [now, setNow] = useState(Math.round(Date.now() / 1000));
  const nowDate = new Date(0);
  nowDate.setUTCSeconds(now);
  const nowFormatted = nowDate.toLocaleString();

  const handleStartChange = (e) => {
    setStart(e.target.value);
    setStartOffset(timeStringToOffset(e.target.value));
  };
  const handleEndChange = (e) => {
    setEnd(e.target.value);
    setEndOffset(timeStringToOffset(e.target.value));
  };
  const handleCopySuccess = (s) => {
    setToast("Copied " + s);
    setToastColor("green");
    setToastFade(true);
    setToastMove(false);

    if (toast === "hello") {
      setToastFade(false);
      setToastMove(true);
    } else {
      setTimeout(() => {
        setToastFade(false);
        setToastMove(true);
      }, 150);
    }

    timeouts.forEach((t) => {
      clearTimeout(t);
    });
    timeouts = [];
    timeouts.push(
      setTimeout(() => {
        setToastFade(true);
        setToastMove(false);
      }, 3000)
    );
    setTimeouts(timeouts);
  };
  const handleCopyFail = (s) => {
    setToast("Fail to copy " + s);
    setToastColor("red");
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-xl mx-auto">
        <div
          className={
            "mt-5 h-auto w-full p-4 my-4 mx-auto rounded-md text-center text-xl " +
            "border text-white bg-" +
            toastColor +
            "-500 " +
            (toastFade ? "opacity-0 " : "") +
            "transition transform duration-300  " +
            (toastMove
              ? "translate-y-0 opacity-1 "
              : "-translate-y-8 opacity-0")
          }
        >
          {toast}
        </div>
        <div className="vspace">
          <span className="now">{now}</span> or <span className="now">{nowFormatted}</span> as the "now" time
        </div>
        <div className="vspace">
          <div className="inline-flex mr-1">Show units: </div>
          <div className="cursor-pointer inline-flex shadow-sm -space-x-px">
            {UNIT_OPTIONS.map((optionName, i) => (
              <a className={"option-btn " + (i === unitOption ? "active" : "")}>
                {optionName}
              </a>
            ))}
          </div>
        </div>
        <div className="vspace">
          <div className="inline-flex mr-1">Use "now" time of: </div>
          <div className="cursor-pointer inline-flex shadow-sm -space-x-px">
            {REALTIME_OPTIONS.map((optionName, i) => (
              <a className={"option-btn " + (i === unitOption ? "active" : "")}>
                {optionName}
              </a>
            ))}
          </div>
        </div>
        <div className="card-container">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <div>
              <label
                htmlFor="start_time"
                className="block text-sm font-medium text-gray-700"
              >
                Start time
              </label>
              <input
                type="text"
                name="start_time"
                id="start_time"
                className="textinput"
                onChange={handleStartChange}
              />
            </div>
            <div>
              <label
                htmlFor="end_time"
                className="block text-sm font-medium text-gray-700"
              >
                End time
              </label>
              <input
                type="text"
                name="end_time"
                id="end_time"
                className="textinput"
                onChange={handleEndChange}
              />
            </div>
          </div>
          <CopyableRow
            now={now}
            startOffset={startOffset}
            endOffset={endOffset}
            handleCopySuccess={handleCopySuccess}
            handleCopyFail={handleCopyFail}
          />
          <CopyableRow
            now={now * 1000}
            startOffset={startOffset * 1000}
            endOffset={endOffset * 1000}
            handleCopySuccess={handleCopySuccess}
            handleCopyFail={handleCopyFail}
          />
        </div>
        <div className="text-lg font-medium leading-6 text-gray-900 mt-5">
          Previous timestamps
        </div>
        <div className="card-container">
        Feature coming soon
        </div>
      </div>
    </div>
  );
}

export default App;
