import "@testing-library/jest-dom";

// Polyfill for structuredClone if needed
if (!global.structuredClone) {
  global.structuredClone = (obj) => {
    if (obj === undefined) return undefined;
    return JSON.parse(JSON.stringify(obj));
  };
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

Object.defineProperty(window, "scrollTo", { value: jest.fn(), writable: true });
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: jest.fn(),
  writable: true,
});
