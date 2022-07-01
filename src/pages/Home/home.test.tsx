import Home from "./";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "../../testUtils/testUtils";
import { MemoryRouter } from "react-router-dom";

describe("Home component test", () => {
  
  it("home rendering", () => {
    let store = createTestStore();
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "search" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  
  it("columns rendering", () => {
    let store = createTestStore();
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "search" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const columns = screen.getAllByTestId("column");
    expect(columns).toMatchSnapshot();
  });
});
