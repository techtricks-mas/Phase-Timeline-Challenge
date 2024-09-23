import { render, screen } from "@testing-library/react";
import { Playhead } from "../Timeline";

describe("Playhead Component", () => {
   it("renders playhead at correct time", () => {
      const time = 100; // Adjust as needed
      render(<Playhead time={time} />);
      const playhead = screen.getByTestId("playhead");
      expect(playhead).toBeInTheDocument();
      expect(playhead).toHaveStyle({
         transform: `translateX(calc(${time}px - 50%))`,
      });
   });
});
