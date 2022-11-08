import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("should have title", () => {
    render(<Page />);
    expect(screen.findByText(/miami minesweeper/i)).toBeInTheDocument();
  });
});
