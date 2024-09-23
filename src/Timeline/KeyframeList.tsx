import React from "react";
import { Segment } from "./Segment";
type KeyframeListProps = {
  maxTime: number
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void; // Type for the onScroll prop
};
export const KeyframeList = React.forwardRef<HTMLDivElement, KeyframeListProps>(({ maxTime, onScroll }, ref) => {
  // TODO: implement scroll sync with `Ruler` and `TrackList`

  return (
    <div className="px-4 min-w-0 overflow-auto" data-testid="keyframe-list" ref={ref} onScroll={onScroll}>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
      <Segment maxTime={maxTime}/>
    </div>
  );
});
