import React, { Ref, useEffect, useState } from "react";

type PlayControlsProps = {
   time: number;
   setTime: (time: number) => void;
   maxTime: number;
   setMaxTime: (maxTime: number) => void;
   rulerRef: Ref<HTMLDivElement>;
   setTrackPosition: (time: number) => void;
};

export const PlayControls = ({ time, setTime, maxTime, setMaxTime, rulerRef, setTrackPosition }: PlayControlsProps) => {
   const [tempTime, setTempTime] = useState({
      prev: time,
      default: time,
   });
   const [tempMaxTime, setTempMaxTime] = useState({
      prev: maxTime,
      default: maxTime,
   });
   const [isArrowClick, setIsArrowClick] = useState<boolean>(false);

   const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.type === "number") {
         setIsArrowClick(true);
      }
   };

   const handleMouseUp = () => {
      setIsArrowClick(false);
   };
   const updateTime = (value: number) => {
      const ruler = (rulerRef as React.RefObject<HTMLDivElement>).current;
      if (ruler) {
         const rulerScrollLeft = ruler.scrollLeft;
         const rulerVisibleWidth = ruler.clientWidth;
         // Calculate normalized scroll position relative to the ruler's total width
         const normalizedScrollX = Math.max(0, Math.min(value - rulerScrollLeft, rulerVisibleWidth));
         setTrackPosition(normalizedScrollX);
      }
      setTime(value);
   };
   // Handle current or duration input change
   const handleTimeChange = (e: React.FormEvent<HTMLInputElement>, type: string) => {
      // current input change
      if (type === "current") {
         if (isArrowClick) {
            const value = Math.round(Number(e.currentTarget.value));
            if (!isNaN(value)) {
               setTempTime({ ...tempTime, default: value >= tempMaxTime.default ? tempMaxTime.default : value });
               const newValue = value >= tempMaxTime.default ? tempMaxTime.default : value;
               updateTime(newValue);
               const input = e.currentTarget;
               setTimeout(() => {
                  if (input) {
                     input.select();
                  }
                  setIsArrowClick(false);
               }, 0);
            }
         } else {
            const value = Number(e.currentTarget.value);
            if (!isNaN(value)) {
               setTempTime({ ...tempTime, default: value });
            }
         }
      } 
      // duration input change
      else {
         if (isArrowClick) {
            const value = Math.round(Number(e.currentTarget.value));
            if (!isNaN(value)) {
               setTempMaxTime({ ...tempMaxTime, default: value });
               setMaxTime(value);
               if (time > value) {
                  setTempTime({ ...tempTime, prev: value, default: value });
                  updateTime(value);
               }
               const input = e.currentTarget;
               setTimeout(() => {
                  if (input) {
                     input.select();
                  }
                  setIsArrowClick(false);
               }, 0);
            }
         } else {
            const value = Number(e.currentTarget.value);
            if (!isNaN(value)) {
               setTempMaxTime({ ...tempMaxTime, default: value });
            }
         }
      }
   };

   // Handle keyboard actions (Arrow keys, Enter, Escape)
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
      // Enter keyboard key action
      if (e.key === "Enter") {
         if (type === "current") {
            const value = tempTime.default >= tempMaxTime.default ? tempMaxTime.default : tempTime.default; // Prevnt value to exceed maxTime
            const roundedValue = Math.round(value / 10) * 10;
            setTempTime({ ...tempTime, prev: roundedValue, default: roundedValue });
            if (e.currentTarget) {
               e.currentTarget.value = roundedValue.toString();
            }
            updateTime(roundedValue);
         } else {
            const validValue = Math.max(100, Math.min(6000, tempMaxTime.default)); // Restrict between 100 and 6000
            const roundedValue = Math.round(validValue / 10) * 10;
            setTempMaxTime({ ...tempMaxTime, prev: roundedValue, default: roundedValue });
            setMaxTime(roundedValue);
            if (time > roundedValue) {
               setTempTime({ ...tempTime, prev: roundedValue, default: roundedValue });
               updateTime(roundedValue);
            }
         }
         e.currentTarget.blur(); // Focus out from input
      } 
      // Escape keyboard key action
      else if (e.key === "Escape") {
         if (type === "current") {
            const roundedValue = Math.round(tempTime.prev / 10) * 10;
            setTempTime({ ...tempTime, prev: roundedValue, default: roundedValue });
            if (e.currentTarget) {
               e.currentTarget.value = roundedValue.toString();
            }
            updateTime(roundedValue);
         } else {
            const roundedValue = Math.round(tempMaxTime.prev / 10) * 10;
            setTempMaxTime({ ...tempMaxTime, prev: roundedValue, default: roundedValue });
            if (e.currentTarget) {
               e.currentTarget.value = roundedValue.toString();
            }
            setMaxTime(roundedValue);
         }
         const input = e.currentTarget;
         setTimeout(() => {
            input.blur(); // Focus out from input
         }, 500);
      } 
      // ArrowUp, ArrowDown keyboard key action
      else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
         setIsArrowClick(true);
      }
   };

   // Handle input focus and selection
   const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.target;
      setTimeout(() => {
         if (input) {
            input.select(); // Select text on focus
         }
      }, 0);
   };

   // Handle input focus lossing
   const hadleBlur = (e: React.FocusEvent<HTMLInputElement>, type: string) => {
      if (type !== "current") {
         const validValue = Math.max(100, Math.min(6000, tempMaxTime.default)); // Restrict between 100 and 6000
         const roundedValue = Math.round(validValue / 10) * 10;
         setTempMaxTime({ ...tempMaxTime, prev: roundedValue, default: roundedValue });
         setMaxTime(roundedValue);
         if (tempTime.default > roundedValue) {
            setTempTime({ ...tempTime, prev: roundedValue, default: roundedValue });
            updateTime(roundedValue);
         }
      } else {
         const value = tempTime.default >= tempMaxTime.default ? tempMaxTime.default : tempTime.default;
         const roundedValue = Math.round(value / 10) * 10;
         setTempTime({ ...tempTime, prev: roundedValue, default: roundedValue });
         if (e.currentTarget) {
            e.currentTarget.value = roundedValue.toString();
         }
         updateTime(roundedValue);
      }
   };

   useEffect(() => {
      setTempTime({ ...tempTime, default: time });
   }, [time]);

   return (
      <div className="flex items-center justify-between border-b border-r border-solid border-gray-700 px-2" data-testid="play-controls">
         <fieldset className="flex gap-1">
            Current
            <input
               className="bg-gray-700 px-1 rounded"
               type="number"
               data-testid="current-time-input"
               min={0}
               max={maxTime}
               step={10}
               value={tempTime.default}
               onInput={(e) => {
                  handleTimeChange(e, "current");
               }}
               onFocus={handleFocus}
               onKeyDown={(e) => handleKeyDown(e, "current")}
               onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               onBlur={(e) => hadleBlur(e, "current")}
            />
         </fieldset>
         -
         <fieldset className="flex gap-1">
            <input
               className="bg-gray-700 px-1 rounded"
               type="number"
               data-testid="duration-input"
               min={100}
               max={6000}
               step={10}
               value={tempMaxTime.default}
               onChange={(e) => {
                  handleTimeChange(e, "duration");
               }}
               onKeyDown={(e) => handleKeyDown(e, "duration")}
               onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               onFocus={handleFocus}
               onBlur={(e) => hadleBlur(e, "duration")}
            />
            Duration
         </fieldset>
      </div>
   );
};
