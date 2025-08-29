import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkeletonLoader } from "./index";

describe("SkeletonLoader Component", () => {
  it("renders default number of skeleton items (6)", () => {
    render(<SkeletonLoader />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(6);
  });

  it("renders specified number of skeleton items", () => {
    render(<SkeletonLoader count={6} />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(6);
  });

  it("renders skeleton items with proper grid layout classes", () => {
    const { container } = render(<SkeletonLoader count={2} />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
      "w-full"
    );
  });

  it("each skeleton item has proper structure and classes", () => {
    render(<SkeletonLoader count={1} />);

    const skeletonItem = screen.getByTestId("skeleton-item");
    expect(skeletonItem).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "border",
      "border-gray-200",
      "animate-pulse"
    );

    // Check for image placeholder
    const imagePlaceholder = skeletonItem.querySelector(
      ".aspect-\\[4\\/3\\].bg-gray-200"
    );
    expect(imagePlaceholder).toBeInTheDocument();

    // Check for content placeholders
    const contentPlaceholders = skeletonItem.querySelectorAll(
      ".bg-gray-200.rounded"
    );
    expect(contentPlaceholders.length).toBeGreaterThan(0);
  });
});
