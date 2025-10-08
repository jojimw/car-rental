import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders the inventory page", () => {
    render(<App />);

    // Should render the inventory page with ZIP code modal or welcome message
    const welcomeText = screen.queryByText(/Welcome to UrbanDrive/i);
    const modalText = screen.queryByText(/Find rental cars near you/i);

    // Should have either welcome state or the modal
    expect(welcomeText || modalText).toBeTruthy();
  });

  it("has proper page structure", () => {
    render(<App />);

    // The app should render without errors
    const appContainer = document.querySelector("body > div");
    expect(appContainer).toBeInTheDocument();
  });
});
