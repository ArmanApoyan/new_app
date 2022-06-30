import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Head from ".";
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe("Head component test",()=>{
    it("Head rendering",()=>{
        const initialState = {}
        const store = mockStore(initialState)
        const {container} = render(
        <Provider store={store}>
            <Head/>
        </Provider>
        )
        expect(container).toMatchSnapshot()
    })
})
