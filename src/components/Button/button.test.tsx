import Button from "./";
import { render, screen, fireEvent } from "@testing-library/react";

describe("test Button component", () => {
    it("renders correctly", () => {
        const { container } = render(<Button>asd</Button>);
        expect(container).toMatchSnapshot();
    });

    it("check call onClick event", () => {
        const fn = jest.fn();
        render(<Button onClick={fn}>qwe</Button>);
        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(fn).toBeCalled();
    })
    
})