import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("should have title", () => {
    render(<Page />);

    expect(screen.getByText(/miami/i)).toBeInTheDocument();
    expect(screen.getByText(/minesweeper/i)).toBeInTheDocument();
  });
});
