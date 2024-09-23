import { render, screen } from "@testing-library/react";
import { KeyframeList } from "../Timeline";

describe("KeyframeList Component", () => {
  it("renders keyframe list", () => {
    render(<KeyframeList maxTime={600} onScroll={jest.fn()} />);
    expect(screen.getByTestId("keyframe-list")).toBeInTheDocument();
  });
});