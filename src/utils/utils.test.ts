import { useSelector } from "react-redux";
import { State } from "../types/global";
import { random, lengthCheck, getIds } from "./";

const numbers = [0, 1, 3, 5];

describe("util function test", () => {
    it("check random function logic 1", () => {
        const newNumber = random(numbers);
        expect(numbers.includes(newNumber ?? 1)).toBeFalsy();
        numbers.push(newNumber ?? 1)       
    });

    it("check random function logic 2", () => {
        const newNumber = random(numbers);
        expect(numbers.includes(newNumber ?? 1)).toBeFalsy();
        numbers.push(newNumber ?? 1)       
    });

    it("check random function logic 3", () => {
        const newNumber = random(numbers);
        expect(numbers.includes(newNumber ?? 1)).toBeFalsy();
        numbers.push(newNumber ?? 1)       
    });

    it("check limit number", () => {
        const newNumber = random(numbers, 20);
        expect((newNumber ?? 1) <= 20).toBeTruthy();
        const newNumber1 = random(numbers, 20);
        expect((newNumber1 ?? 1) <= 20).toBeTruthy();
        const newNumber2 = random(numbers, 20);
        expect((newNumber2 ?? 1) <= 20).toBeTruthy();
    });
})

describe("lengthCheck function test", ()=> {
    it("check function 1",()=> {
        const res = lengthCheck("asd",10)
        expect(typeof res).toEqual("string")
    })
    it("check function 2",()=> {
        const res = lengthCheck("aaa",0)
        expect(res.length).toEqual(3)
    })
    it("check function 3",()=> {
        const res = lengthCheck("aaa",0)
        expect(res.length).toEqual(3)
    })
})
