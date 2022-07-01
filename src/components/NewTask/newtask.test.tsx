import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createTestStore } from "../../testUtils/testUtils";
import NewTask from "./";

describe("newtask component test", () => {
  it("newtask rendering", () => {
    let store = createTestStore();
    const close = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NewTask close={close} type="" />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it("closing after adding", () => {
    let store = createTestStore();
    const close = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NewTask close={close} type="add" />
      </Provider>
    );
    const btn = screen.getByText("ADD")
    fireEvent.click(btn)
    expect(container).toMatchSnapshot()
  });
  it("closing after saving", () => {
    let store = createTestStore();
    const close = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NewTask close={close} type="create" />
      </Provider>
    );
    const btn = screen.getByText("Save")
    fireEvent.click(btn)
    expect(container).toMatchSnapshot()
  });
  it("input changing", () => {
    let store = createTestStore();
    const close = jest.fn();
    render(
      <Provider store={store}>
        <NewTask close={close} type="add" />
      </Provider>
    );
    const inp = screen.getByTestId("inp")
    userEvent.type(inp,"title")
    expect(inp).toHaveValue("title")
  });
  it("textarea changing", () => {
    let store = createTestStore();
    const close = jest.fn();
    render(
      <Provider store={store}>
        <NewTask close={close} type="add" />
      </Provider>
    );
    const textarea = screen.getByTestId("textarea")
    userEvent.type(textarea,"description")
    expect(textarea).toHaveValue("description")
  });
  it("view mode", () => {
    let store = createTestStore();
    const close = jest.fn();
    render(
      <Provider store={store}>
        <NewTask close={close} type="view" />
      </Provider>
    );
    const ps = screen.getAllByTestId("p")
    expect(ps).toMatchSnapshot()
  });
  it("select changing", () => {
    let store = createTestStore();
    const close = jest.fn();
    render(
      <Provider store={store}>
        <NewTask close={close} type="add" />
      </Provider>
    );
    const select = screen.getByTestId("select")
    userEvent.selectOptions(select,"Done")
    expect(select).toHaveValue("Done")
    userEvent.selectOptions(select,"On Progress")
    expect(select).toHaveValue("On Progress")
  });
  it("back button", () => {
    let store = createTestStore();
    const close = jest.fn();
    render(
      <Provider store={store}>
        <NewTask close={close} type="view" />
      </Provider>
    );
    const ps = screen.getAllByTestId("p")
    const value = ps[2].innerText
    fireEvent.dblClick(ps[2])
    const status = screen.getByTestId("inp")
    userEvent.type(status,"asd")
    fireEvent.click(screen.getByTestId("back"))
    expect(screen.getAllByTestId("p")[2].innerText).toEqual(value)
  });
});
