import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import Home from "../../pages/Home";
import { createTestStore } from "../../testUtils/testUtils";
import { createMemoryHistory } from "history";

describe("Element component test", () => {
  let store = createTestStore();
  it("Element rendering", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("task")).toMatchSnapshot();
  });
  it("close button click", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const buttons = screen.getAllByTestId("close");
    fireEvent.click(buttons[0]);
    expect(buttons[0]).not.toBeInTheDocument();
  });
  it("dblclick on task changing url search", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
            <Home />
        </Provider>
      </Router>
    );
    const tasks = screen.getAllByTestId("task");
    fireEvent.dblClick(tasks[0]);
    expect(history.location.search).toBe("?task=2");
  });
  it("close button click", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const button = screen.getAllByTestId("edit_btn");
    fireEvent.click(button[0]);
    expect(screen.getByTestId("modal")).toMatchSnapshot()
  });
  it("dblclick on task opening modal", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const tasks = screen.getAllByTestId("task");
    fireEvent.dblClick(tasks[0]);
    expect(screen.getByTestId("modal")).toMatchSnapshot()
  });
  it("modal outside click", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const tasks = screen.getAllByTestId("task");
    fireEvent.dblClick(tasks[0]);
    const body =  screen.getByTestId("body");
    fireEvent.click(body)
    expect(body).toBeInTheDocument()   
  });
});
