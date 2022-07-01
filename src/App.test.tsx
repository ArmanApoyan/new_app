import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { createTestStore } from "./testUtils/testUtils";

describe("App test", () => {
  const store = createTestStore();

  test("renders learn react link", () => {
    const { container } = render(
        <Provider store={store}>
          <App />
        </Provider>
    );
    expect(container).toMatchSnapshot()
  });
});
