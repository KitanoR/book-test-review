import "@testing-library/jest-dom";
// import { cache } from "@chakra-ui/react";
// import { createSerializer } from "@emotion/jest";

// Chakra UI fix for tests
// expect.addSnapshotSerializer(createSerializer(cache));

// Polyfill for structuredClone if needed
if (!global.structuredClone) {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

if (!window.matchMedia) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false, // Change to true if you want to simulate dark mode
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated method
    removeListener: jest.fn(), // Deprecated method
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
