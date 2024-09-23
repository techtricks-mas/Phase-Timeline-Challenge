import { render, screen } from "@testing-library/react";
import { Segment } from "../Timeline";

describe("Segment Component", () => {
  it("renders with correct width", () => {
    const maxTime = 200;
    render(<Segment maxTime={maxTime} />);
    const segment = screen.getByTestId("segment");
    expect(segment).toHaveStyle(`width: ${maxTime}px`);
  });
});
