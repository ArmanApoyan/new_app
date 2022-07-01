import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import Modal from "./"


describe("modal test",()=> {
    
    it("modal rendering",()=>{
        const close = jest.fn()
        const {container} =  render(<Modal isOpen={true} close={close}><p>asd</p></Modal>)
        expect(container).toMatchSnapshot()     
    })  
    
    it("modal close",()=>{
        const close = jest.fn()
        render(<Modal isOpen={true} close={close}><p>asd</p></Modal>)
        const btn = screen.getByTestId("btn")
        fireEvent.click(btn)
        expect(close).toBeCalled()
    })
})
