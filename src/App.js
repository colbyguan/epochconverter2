import React, { useState } from "react";
import clsx from 'clsx';
import CopyableRow from "./components/CopyableRow";
import { timeStringToOffset } from "./helpers";

// const UNIT_OPTIONS = ['both', 'millis', 'seconds']
// const REALTIME_OPTIONS = ['page load', 'realtime']
const QUICK_TIMESTAMPS = [
  ['-0m', '-5m', '-10m', '-15m', '-30m'],
  ['-1h', '-2h', '-4h', '-8h', '-12h', '-24h', '-36h'],
  ['-1d', '-2d', '-4d', '-7d']]
const QUICK_LABELS = ['minutes', 'hours', 'days'];

function utcStringToTimeThenDate(utcStr) {
  const tokens = utcStr.split(' ');
  return `${tokens[4]} ${tokens[5]} ${tokens[0]} ${tokens[1]} ${tokens[2]} ${tokens[3]}`;
}

function App() {
  // Time values
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [delimiter, setDelimiter] = useState(":");
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const [lastFocusedWasStart, setLastFocusedWasStart] = useState(true);
  const [ringInput, setRingInput] = useState(false);
  const [flashQuickFillLabel, setFlashQuickFillLabel] = useState(true);
  let [flashTimeouts, setFlashTimeouts] = useState([]);

  // Options
  // const [unitOption, setUnitOption] = useState(0)
  // const [realtimeOption, setRealtimeOption] = useState(0)

  // Animation
  const [toast, setToast] = useState("hello");
  const [toastColor, setToastColor] = useState("white");
  const [toastFade, setToastFade] = useState(false);
  const [toastMove, setToastMove] = useState(false);
  let [timeouts, setTimeouts] = useState([]);

  const [now] = useState(Math.round(Date.now() / 1000));
  const nowDate = new Date(0);
  nowDate.setUTCSeconds(now);

  const handleQuickTimestamp = (ts) => {
    if (lastFocusedWasStart) {
      setStart(ts);
      setStartOffset(timeStringToOffset(ts));
    } else {
      setEnd(ts);
      setEndOffset(timeStringToOffset(ts));
    }
  }
  const handleStartChange = (e) => {
    setStart(e.target.value);
    setStartOffset(timeStringToOffset(e.target.value));
  };
  const handleEndChange = (e) => {
    setEnd(e.target.value);
    setEndOffset(timeStringToOffset(e.target.value));
  };
  const handleDelimChange = (e) => {
    setDelimiter(e.target.value);
  }
  const handleCopySuccess = (s) => {
    setToast("Copied " + s);
    window.gtag('event', 'copy', {
      'event_category': 'user_action',
      'event_label': 'copied',
      'value': s
    })
    setToastColor("bg-green-500");
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

  const changeQuickFillLabel = (wasStart) => {
    setLastFocusedWasStart(wasStart)
    setFlashQuickFillLabel('bg-blue-200')
    flashTimeouts.forEach((t) => {
      clearTimeout(t);
    });
    flashTimeouts = []
    flashTimeouts.push(setTimeout(() => setFlashQuickFillLabel('bg-transparent'), 1000))
    setFlashTimeouts(flashTimeouts)
  }

  const handleCopyFail = (s) => {
    setToast("Fail to copy " + s);
    setToastColor("bg-red-500");
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        <div
          className={
            "mt-5 h-auto w-full p-4 my-4 mx-auto rounded-md text-center text-xl border text-white "
            + toastColor + " " +
            (toastFade ? "opacity-0 " : "") +
            "transition transform duration-300  " +
            (toastMove
              ? "translate-y-0 opacity-1 "
              : "-translate-y-8 opacity-0")
          }
        >
          {toast}
        </div>

        {/* <div className="vspace">
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
        </div> */}
        <div className="card-container">
          <div className="card-grid mt-10 mb-6">
            <div className="side-col"></div>
            <div className="double-main-col relative">
              <div className="mb-2"><span className="text-3xl font-bold">{now}</span> as the "now" time</div>
              <div className="text-sm text-gray-500"><span className="font-semibold">or, {nowDate.toLocaleTimeString()} {nowDate.toLocaleDateString()}</span> locally </div>
              <div className="text-sm text-gray-500"><span className="font-semibold">or, {utcStringToTimeThenDate(nowDate.toUTCString())}</span></div>
            </div>
          </div>
          <div className="card-grid mb-6">
            <div className="side-col"></div>
            <div className="double-main-col relative">
              <div className="textinput-label mb-1">quick fill <span className={'transition-colors ' + flashQuickFillLabel}>{(lastFocusedWasStart ? "start time" : "end time")}:</span></div>
              {QUICK_TIMESTAMPS.map((unit, rowIdx) =>
                <div className="">
                  {unit.map(timestamp => (
                    <div
                      className={"w-10 p-1 text-sm text-right cursor-pointer inline-block font-mono border-gray-300 hover:bg-blue-200 " + (rowIdx === 1 ? "" : "")}
                      onClick={(e) => handleQuickTimestamp(timestamp)}
                      onMouseEnter={() => setRingInput(true)}
                      onMouseLeave={() => setRingInput(false)}
                      key={timestamp}>
                      {timestamp}
                    </div>
                  ))}
                  <span className="ml-1 text-xs font-bold text-gray-400">({QUICK_LABELS[rowIdx]})</span>
                </div>)}
              <div className="delimiter absolute top-0 right-0">
                <label
                  htmlFor="start_time"
                  className="textinput-label"
                >
                  Delimiter
                </label>
                <input
                  type="text"
                  id="delimiter"
                  className={'textinput'}
                  value={delimiter}
                  onChange={handleDelimChange}
                />
              </div>
            </div>
          </div>
          <div className="card-grid mb-6">
            <div className="side-col"></div>
            <div className="main-col cursor-pointer">
              <label
                htmlFor="start_time"
                className="textinput-label"
              >
                Start time (ex: -1d, -4h)
              </label>
              <input
                type="text"
                name="start_time"
                id="start_time"
                className={clsx((ringInput && lastFocusedWasStart && 'border-blue-400') || 'border-gray-300', 'textinput')}
                onChange={handleStartChange}
                onFocus={(e) => changeQuickFillLabel(true)}
                value={start}
              />
            </div>
            <div className="main-col cursor-pointer">
              <label
                htmlFor="end_time"
                className="textinput-label"
              >
                End time (click for quick fill)
              </label>
              <input
                type="text"
                name="end_time"
                id="end_time"
                className={clsx((ringInput && !lastFocusedWasStart && 'border-blue-400') || 'border-gray-300', 'textinput')}
                onChange={handleEndChange}
                onFocus={(e) => changeQuickFillLabel(false)}
                value={end}
              />
            </div>
          </div>
          <div className="card-grid mt-4 text-gray-400 text-sm font-medium">
            <div className="side-col"></div>
            <div className="main-col">seconds</div>
          </div>

          <CopyableRow
            now={now}
            startOffset={startOffset}
            endOffset={endOffset}
            delimiter={delimiter}
            handleCopySuccess={handleCopySuccess}
            handleCopyFail={handleCopyFail}
          />
          <div className="card-grid mt-4 text-gray-400 text-sm font-medium">
            <div className="side-col"></div>
            <div className="main-col">millis</div>
          </div>
          <CopyableRow
            now={now * 1000}
            startOffset={startOffset * 1000}
            endOffset={endOffset * 1000}
            delimiter={delimiter}
            handleCopySuccess={handleCopySuccess}
            handleCopyFail={handleCopyFail}
          />
          <div className="my-10 h-1 w-1"></div>
        </div>
        {/* <div className="text-lg font-medium leading-6 text-gray-900 mt-5">
          Previous timestamps
        </div>
        <div className="card-container">
          Feature coming soon
        </div> */}
      </div>
    </div >
  );
}

export default App;
