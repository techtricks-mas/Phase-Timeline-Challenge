import React, { Ref, useRef, useState } from "react";

type RulerProps = {
   time: number;
   width: number;
   onTimeUpdate: (newTime: number) => void;
   onPositionUpdate: (newTime: number) => void;
   onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
   PlayheadRef: Ref<HTMLDivElement>;
};

export const Ruler = React.forwardRef<HTMLDivElement, RulerProps>(({ time, width, onTimeUpdate, onPositionUpdate, onScroll, PlayheadRef }, ref) => {
   const [isDragging, setIsDragging] = useState(false);
   const rulerBarRef = useRef<HTMLDivElement | null>(null);

   const updateTimeFromPosition = (clientX: number) => {
      if (rulerBarRef.current && ref) {
         const rulerBar = rulerBarRef.current.getBoundingClientRect();
         const clickX = clientX - rulerBar.left;
         
         // Ensure clickX is within the bounds of rulerBar
         const normalizedClickX = Math.max(0, Math.min(clickX, rulerBar.width));

         // Calculate time proportionally based on the width of the ruler bar
         const newTime = (normalizedClickX / rulerBar.width) * width;
         onTimeUpdate(newTime);

         // Get the ruler element's bounding rect for calculating position
         const ruler = (ref as React.RefObject<HTMLDivElement>).current;
         if (ruler) {
            const rulerScrollLeft = ruler.scrollLeft;
            const rulerVisibleWidth = ruler.clientWidth;
            // Calculate normalized scroll position relative to the ruler's total width
            const normalizedScrollX = Math.max(0, Math.min(normalizedClickX - rulerScrollLeft, rulerVisibleWidth));
            onPositionUpdate(normalizedScrollX);

            const Playhead = (PlayheadRef as React.RefObject<HTMLDivElement>).current;
            if (Playhead) {
               Playhead.style.zIndex = Math.sign(time - rulerScrollLeft) === -1 ? "-1" : "0";
            }
         }
      }
   };

   const handleRulerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      updateTimeFromPosition(e.clientX); // Update time based on where the user clicks
   };

   const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
         updateTimeFromPosition(e.clientX); // Update time during dragging
      }
   };

   const handleMouseUp = () => {
      if (isDragging) {
         window.removeEventListener("mousemove", handleMouseMove);
         window.removeEventListener("mouseup", handleMouseUp);
      }
   };

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleRulerClick(e);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
   };
   const handleMouseEnter = () => {
      setIsDragging(true);
      document.body.style.userSelect = "none";
   };

   const handleMouseLeave = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
   };

   // watch Scroll movement
   const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollLeft = target.scrollLeft;

      const ruler = (ref as React.RefObject<HTMLDivElement>).current;
      if (ruler) {
         const normalizedScrollX = Math.max(0, Math.min(time - scrollLeft, ruler.clientWidth));
         onPositionUpdate(normalizedScrollX);

         const Playhead = (PlayheadRef as React.RefObject<HTMLDivElement>).current;
         if (Playhead) {
            Playhead.style.zIndex = Math.sign(time - scrollLeft) === -1 ? "-1" : "0";
         }
      }

      onScroll(e);
   };

   return (
      <div
         ref={ref}
         onScroll={scrollHandler}
         className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
         data-testid="ruler"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
         <div ref={rulerBarRef} style={{ width: width }} className="h-6 rounded-md bg-white/25" data-testid="ruler-bar" onClick={handleRulerClick} onMouseDown={handleMouseDown}></div>
      </div>
   );
});
