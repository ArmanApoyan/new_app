import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import Home from "../../pages/Home";
import { createTestStore } from "../../testUtils/testUtils";
import { createMemoryHistory } from "history";
import useOutsideClick from "../../hooks/outSideClick";

describe("Element component test", () => {
  const store = createTestStore();

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
    const history = createMemoryHistory({ initialEntries: [{ pathname: "/", search: "task=1" }] });
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
  
  it("edit button click", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const button = screen.getAllByTestId("edit_btn");
    fireEvent.click(button[0]);
    expect(screen.getByTestId("modal")).toMatchSnapshot();
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
    expect(screen.getByTestId("modal")).toMatchSnapshot();
  });
  
  it("modal inside click", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    const tasks = screen.getAllByTestId("task");
    fireEvent.dblClick(tasks[0]);
    const body = screen.getByTestId("body");
    fireEvent.click(body);
    expect(body).toBeInTheDocument();
  });
  
  // it("modal outside click", () => {
  //   const fun = jest.fn()
  //   const { container } = render(
  //     <MemoryRouter initialEntries={[{ pathname: "/", search: "task=1" }]}>
  //       <Provider store={store}>
  //         <Home />
  //       </Provider>
  //     </MemoryRouter>
  //   );
  //   fireEvent.dblClick(screen.getAllByTestId("task")[0])
  //   const body = screen.getByTestId("body")
  //   useOutsideClick(body,fun)
  //   const modal = screen.getByTestId("modal")
  //   fireEvent.click(modal)
  //   expect(body).not.toBeInTheDocument()
  // });
});
