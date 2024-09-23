import React from "react";

type PlayheadProps = {
   time: number;
};

export const Playhead = React.forwardRef<HTMLDivElement, PlayheadProps>(({ time }, ref) => {
   return (
      <div ref={ref} className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10" data-testid="playhead" style={{ transform: `translateX(calc(${time}px - 50%))` }}>
         <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
      </div>
   );
});
