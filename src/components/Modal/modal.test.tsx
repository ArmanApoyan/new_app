import { fireEvent, render, screen } from "@testing-library/react"
import Modal from "./"


describe("modal test",()=> {
    const close = jest.fn()

    it("modal rendering",()=>{
        const {container} =  render(<Modal isOpen={true} close={close}><p>asd</p></Modal>)
        expect(container).toMatchSnapshot()     
    })  
    
    it("modal close",()=>{
        render(<Modal isOpen={true} close={close}><p>asd</p></Modal>)
        const btn = screen.getByTestId("btn")
        fireEvent.click(btn)
        expect(close).toBeCalled()
    })
})
