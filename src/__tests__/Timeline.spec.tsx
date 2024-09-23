import { render, screen } from "@testing-library/react";
import { Timeline } from "../Timeline";

describe("Timeline Component", () => {
  it("renders the timeline component", () => {
    render(<Timeline />);
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
  });
});