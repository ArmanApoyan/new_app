import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Head from ".";
import { createTestStore } from "../../testUtils/testUtils";


describe("Head component test",()=>{
    const store = createTestStore()

    it("Head rendering",()=>{
        const {container} = render(
        <Provider store={store}>
            <Head/>
        </Provider>
        )
        expect(container).toMatchSnapshot()
    })
    
    it("modal opening",()=>{
        const {container} = render(
        <Provider store={store}>
            <Head/>
        </Provider>
        )
        const btn = screen.getByTestId("add")
        fireEvent.click(btn)
        expect(screen.getByTestId("modal")).toMatchSnapshot()
    })
})
