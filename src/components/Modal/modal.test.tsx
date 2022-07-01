import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./";

describe("modal test", () => {
  const close = jest.fn();

  it("modal rendering", () => {
    const { container } = render(
      <Modal isOpen={true} close={close}>
        <p>asd</p>
      </Modal>
    );
    expect(container).toMatchSnapshot();
  });

  it("modal close", () => {
    render(
      <Modal isOpen={true} close={close}>
        <p>asd</p>
      </Modal>
    );
    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    expect(close).toBeCalled();
  });

  it("modal outside click", () => {
    render(
      <Modal isOpen={true} close={close}>
        <p>asd</p>
      </Modal>
    );
    fireEvent.mouseDown(document.body);
    expect(close).toBeCalled();
  });
  
  it("modal inside click", () => {
    render(
      <Modal isOpen={true} close={close}>
        <p>asd</p>
      </Modal>
    );
    fireEvent.mouseDown(screen.getByTestId("body"));
    expect(close).not.toBeCalled();
  });

});
