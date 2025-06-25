import '@testing-library/jest-dom';

beforeAll(() => {
  window.scrollTo = vi.fn();
});

//have to manually add the popup, which is blank
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
};