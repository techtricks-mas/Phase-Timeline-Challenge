type SegmentProps = {
   maxTime: number;
};
export const Segment = ({ maxTime }: SegmentProps) => {
   // TODO: resize based on time

   return (
      <div style={{ width: maxTime }} className="py-2" data-testid="segment">
         <div className="h-6 rounded-md bg-white/10"></div>
      </div>
   );
};
