import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Search from "./";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore();

describe("Search component test", () => {
  it("search rendering", () => {
    const initState = {};
    const store = mockStore(initState);
    const { container } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  
  it("input rendering", () => {
    const initState = {};
    const store = mockStore(initState);
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const inp = screen.getByPlaceholderText("Search");
    expect(inp).toBeInTheDocument();
    expect(inp).toHaveAttribute("type", "search");
  });

  it ("input change",()=>{
    const initState = {};
    const store = mockStore(initState);
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const inp = screen.getByPlaceholderText("Search");
    userEvent.type(inp,"task 1")
    expect(inp).toHaveValue("task 1")
  })
});
