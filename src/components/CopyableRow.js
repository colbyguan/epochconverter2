import React, { useState } from "react";
import CopyIcon from "./CopyIcon";
import copy from 'copy-to-clipboard';

const CopyableRow = (props) => {
  let startBorderColor = borderColorFromOffset(props.startOffset);
  let endBorderColor = borderColorFromOffset(props.endOffset);
  if (props.disableBorder === true) {
    startBorderColor = "border-white";
    endBorderColor = "border-white";
  }
  const [hovered, setHovered] = useState(false);

  let startTime = timeTextFromNowAndOffset(props.now, props.startOffset);
  let endTime = timeTextFromNowAndOffset(props.now, props.endOffset);

  const handleEnter = (e) => {
    setHovered(true);
  };
  const handleLeave = (e) => {
    setHovered(false);
  };
  const copyStartEnd = () => {
    const toCopy = startTime + ":" + endTime;
    copy(toCopy);
    props.handleCopySuccess(toCopy);
  };

  return (
    <div className={"grid grid-cols-3 px-2 " + (hovered ? "gap-0" : "gap-2")}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={copyStartEnd}
        className="group cursor-pointer hover:bg-yellow-200 rounded-md flex flex-row m-1 px-2 py-1"
      >
        <CopyIcon />
        start:end
      </div>
      <CopyableTime
        borderColor={startBorderColor}
        alignLeft={true}
        ts={startTime}
        hovered={hovered}
        handleCopySuccess={props.handleCopySuccess}
        handleCopyFail={props.handleCopyFail}
      />
      <CopyableTime
        borderColor={endBorderColor}
        ts={endTime}
        hovered={hovered}
        handleCopySuccess={props.handleCopySuccess}
        handleCopyFail={props.handleCopyFail}
      />
    </div>
  );
};

const borderColorFromOffset = (offset) => {
  if (offset < 0) {
    return "border-red-500";
  } else if (offset === 0) {
    return "border-gray-300";
  } else {
    return "border-green-500";
  }
};
const timeTextFromNowAndOffset = (now, offset) => {
  if (offset < 0) {
    return "bad input";
  } else {
    return now - offset;
  }
};

const CopyableTime = (props) => {
  const hovered = props.hovered;
  const ts = props.ts;
  const alignLeft = props.alignLeft;

  const copyTs = () => {
    console.log(props.ts);
    copy(props.ts);
    props.handleCopySuccess(props.ts);
  };

  return (
    <div
      onClick={copyTs}
      className={
        "group border w-full cursor-pointer hover:bg-blue-200 flex flex-row my-1 px-2 py-1 " +
        (hovered
          ? "bg-yellow-300 rounded-none border-yellow-300 "
          : props.borderColor + " rounded-md ") +
        (hovered && alignLeft ? "rounded-l-md " : "rounded-r-md")
      }
    >
      {!hovered ? <CopyIcon /> : ""}
      <div className={"w-full " + (hovered && alignLeft ? "text-right" : "")}>
        {props.ts + (hovered && alignLeft ? " : " : "")}
      </div>
    </div>
  );
};

export default CopyableRow;
