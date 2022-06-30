import Home from "./";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "../../utils";

describe("Home component test",()=>{
    it("home rendering",()=>{
        let store = createTestStore()
        const {container} = render(
            <Provider store={store}>
                <Home></Home>
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })
})