import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "./index";

describe("EmptyState Component", () => {
  it("renders basic empty state with title and description", () => {
    render(
      <EmptyState
        title="No results"
        description="No items found matching your criteria"
      />
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(
      screen.getByText("No items found matching your criteria")
    ).toBeInTheDocument();
  });

  it("renders with border when showBorder prop is true", () => {
    render(
      <EmptyState
        title="No results"
        description="Test description"
        showBorder
      />
    );

    const container = screen.getByText("No results").closest("div");
    expect(container).toHaveClass("border");
  });

  it("renders without border when showBorder prop is false", () => {
    render(
      <EmptyState
        title="No results"
        description="Test description"
        showBorder={false}
      />
    );

    const container = screen.getByText("No results").closest("div");
    expect(container).not.toHaveClass("border");
  });

  it("renders action button when actionText and onAction are provided", () => {
    const mockAction = vi.fn();
    render(
      <EmptyState
        title="No results"
        description="Test description"
        actionText="Take Action"
        onAction={mockAction}
      />
    );

    const button = screen.getByText("Take Action");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it("does not render action button when actionText is provided but onAction is not", () => {
    render(
      <EmptyState
        title="No results"
        description="Test description"
        actionText="Take Action"
      />
    );

    expect(screen.queryByText("Take Action")).not.toBeInTheDocument();
  });

  it("does not render action button when onAction is provided but actionText is not", () => {
    const mockAction = vi.fn();
    render(
      <EmptyState
        title="No results"
        description="Test description"
        onAction={mockAction}
      />
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
