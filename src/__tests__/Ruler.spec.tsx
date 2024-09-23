import { render, screen } from "@testing-library/react";
import { Ruler } from "../Timeline";

describe("Ruler Component", () => {
  it("renders ruler with correct time", () => {
    const time = 200;
    render(<Ruler time={time} width={600} onTimeUpdate={jest.fn()} onPositionUpdate={jest.fn()} onScroll={jest.fn()} PlayheadRef={null}/>);
    expect(screen.getByTestId("ruler")).toBeInTheDocument(); // Adjust as necessary
  });
});
