import { useCallback, useRef, useState } from "react";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";

export const Timeline = () => {
  // FIXME: performance concerned
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(2000);
  const [trackPosition, setTrackPosition] = useState(0);
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const TrackListRef = useRef<HTMLDivElement | null>(null);
  const keyframeListRef = useRef<HTMLDivElement | null>(null);
  const PlayheadRef = useRef<HTMLDivElement | null>(null);

  const handleTimeUpdate = (newTime: number) => {
    const roundedValue = Math.round(newTime / 10) * 10;
    setTime(roundedValue);
  };

  const handlePositionUpdate = (newTime: number) => {
    const roundedValue = Math.round(newTime / 10) * 10;
    setTrackPosition(roundedValue);
  };

  const handleScroll = useCallback((sourceRef: React.RefObject<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>, event: string | undefined) => {
    const source = sourceRef.current;
    const target = targetRef.current;
    if (source && target) {
      if (event === 'top') {
        target.scrollTop = source.scrollTop;
      } else {
        target.scrollLeft = source.scrollLeft;
      }
    }
  }, []);

  const handleRulerScroll = () => handleScroll(rulerRef, keyframeListRef, 'left');
  const handleKeyframeScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isCorrectElement = target === TrackListRef.current;
    if (isCorrectElement) {
      handleScroll(TrackListRef, keyframeListRef, 'top')
    }
    else{
      handleScroll(keyframeListRef, TrackListRef, 'top')
      handleScroll(keyframeListRef, rulerRef, 'left')
    }
  };
  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls time={time} setTime={setTime} maxTime={maxTime} setMaxTime={setMaxTime} rulerRef={rulerRef} setTrackPosition={setTrackPosition} />
      <Ruler ref={rulerRef} time={time} onScroll={handleRulerScroll} width={maxTime} onTimeUpdate={handleTimeUpdate} onPositionUpdate={handlePositionUpdate} PlayheadRef={PlayheadRef} />
      <TrackList ref={TrackListRef} onScroll={handleKeyframeScroll}/>
      <KeyframeList ref={keyframeListRef} onScroll={handleKeyframeScroll} maxTime={maxTime}/>
      <Playhead time={trackPosition} ref={PlayheadRef}/>
    </div>
  );
};
