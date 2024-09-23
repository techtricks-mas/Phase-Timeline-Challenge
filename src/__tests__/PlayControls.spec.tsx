import { render, screen } from "@testing-library/react";
import { PlayControls } from "../Timeline";

describe("PlayControls Component", () => {
  it("renders play controls", () => {
    render(<PlayControls time={0} setTime={jest.fn()} maxTime={2000} setMaxTime={jest.fn()} rulerRef={null} setTrackPosition={jest.fn()} />);
    expect(screen.getByTestId("play-controls")).toBeInTheDocument();
  });
});
