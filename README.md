# UrbanDrive Frontend

A modern React application for browsing and filtering UrbanDrive's vehicle inventory with a responsive design optimized for desktop, tablet, and mobile devices.

## Getting Started

### Prerequisites

Ensure you have Node.js version 18 or higher installed on your system.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Run the linter:

```bash
npm run lint
```

Auto fix linting issues:

```bash
npm run lint:fix
```

Format code with Prettier:

```bash
npm run format
```

Check code formatting:

```bash
npm run format:check
```

### Testing

Run the test suite:

```bash
npm test
```

## Architecture

### Technology Stack

The application is built with modern web technologies focused on performance and user experience:

**Core Framework:** React 19 with TypeScript provides type safety and modern React features including automatic batching and improved Suspense behavior.

**Build Tool:** Vite offers fast hot module replacement during development and optimized production builds.

**Styling:** Tailwind CSS enables rapid UI development with utility classes and responsive design patterns.

**State Management:** Zustand provides lightweight global state management for vehicle data, filters, and user location.

**UI Components:** Radix UI components deliver accessible, unstyled primitives for complex interactions like accordions and dialogs.

### Project Structure

**Components:** Reusable UI elements organized by functionality, including vehicle cards, filter interfaces, and modal dialogs.

**Pages:** Top level route components that compose smaller components into complete user interfaces.

**Store:** Global state management using Zustand stores for vehicle inventory, filtering, and ZIP code handling.

**Types:** TypeScript interfaces and type definitions for vehicles, filters, and application state.

**Utils:** Helper functions for data validation, formatting, and business logic.

**Data:** Mock vehicle data and static content used throughout the application.

## Features

### Vehicle Inventory

The application displays a responsive grid of available vehicles with detailed information including make, model, year, color, mileage, and pricing. Each vehicle card shows key details and high quality images.

### Advanced Filtering

**Desktop Experience:** A sticky sidebar provides expandable accordion sections for Make and Color filters with checkbox based multi selection capabilities.

**Mobile Experience:** A responsive filter system with a sticky top bar showing selected filters as removable chips, plus a full screen modal for detailed filter selection.

**Filter Management:** Users can select multiple makes and colors simultaneously, view active filters as removable chips, and clear all filters with a single action.

### Location Based Browsing

The application requires a valid US ZIP code to display relevant vehicle inventory. ZIP code validation ensures data quality while a persistent modal guides new users through the location setup process.

### Responsive Design

**Mobile First:** Horizontal scrolling filter chips with snap behavior and gradient fade effects provide optimal touch interaction.

**Tablet Adaptation:** Filter interface adapts with appropriate spacing and interaction patterns for medium screen sizes.

**Desktop Optimization:** Full sidebar layout with expanded filter options and efficient use of screen real estate.

## Design Decisions

### Component Architecture

The filter system uses a reusable architecture where core filtering logic is extracted into `FilterAccordionContent` and shared between the desktop sidebar and mobile modal. This approach ensures consistency while allowing platform specific optimizations.

### State Management

Zustand was chosen for its simplicity and TypeScript integration. The vehicle store handles complex filtering logic with array based selections, while the ZIP code store manages location state with browser persistence.

### User Experience

**Progressive Disclosure:** Filter options are organized in collapsible accordions to reduce visual complexity while maintaining access to all options.

**Immediate Feedback:** Filter changes trigger loading states and smooth transitions to provide clear feedback about system responsiveness.

**Accessibility First:** Radix UI components ensure proper keyboard navigation, screen reader support, and focus management throughout the application.

### Performance Considerations

**Lazy Loading:** Components are structured to minimize initial bundle size while maintaining fast interaction response times.

**Efficient Filtering:** Vehicle filtering uses optimized array operations with debounced updates to maintain smooth performance with large datasets.

**Memory Management:** State updates are batched and optimized to prevent unnecessary re renders during rapid user interactions.