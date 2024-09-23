import { render, screen } from "@testing-library/react";
import { TrackList } from "../Timeline";

describe("TrackList Component", () => {
  it("renders track list", () => {
    render(<TrackList onScroll={jest.fn()} />);
    expect(screen.getByTestId("track-list")).toBeInTheDocument();
  });
});
