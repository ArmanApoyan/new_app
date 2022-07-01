import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Search from "./";
import userEvent from "@testing-library/user-event";
import { createTestStore } from "../../testUtils/testUtils";


describe("Search component test", () => {
  const store = createTestStore()

  it("search rendering", () => {
    const { container } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  
  it("input rendering", () => {
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
