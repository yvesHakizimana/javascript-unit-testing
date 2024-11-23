import {calculateAverage, factorial, fizzBuzz, max} from "../src/intro.js";
import {describe, it, expect} from "vitest";

describe('Intro test', () => {
    it('should return first argument if it greater', () => {
        expect(max(2, 1)).toBe(2)
    })
    it('should return second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2)
    })
    it('should return first argument if they are equal', () => {
        expect(max(2, 2)).toBe(2)
    } )
})

describe('FizzBuzz', () => {
    it('should return FizzBuzz when arg is divisible by both 3 and five', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })
    it('should return Fizz  when arg is divisible by only 3', () =>{
        expect(fizzBuzz(6)).toBe('Fizz')
    })
    it('should return Buzz when arh is divisible by only 5', () => {
        expect(fizzBuzz(10)).toBe('Buzz')
    })
})

describe('Calculate Average', () => {
    it('should return NaN when input array is empty', () => {
        expect(calculateAverage([])).toBe(NaN)
    })
    it('should return the first number of the array when array contains only one element', () => {
        expect(calculateAverage([1])).toBe(1)
    })
    it('should calculate the average of  numbers in the array when array contains more than one element', () => {
        expect(calculateAverage([1, 2])).toBe(1.5)
    })

})

describe('Factorial', () => {
    it('should return 1 when arg is 0', () => {
        expect(factorial(0)).toBe(1)
    })
    it('should return 1 when arg is 1', () => {
        expect(factorial(1)).toBe(1)
    })
    it('should return undefined when arg is negative number', () => {
        expect(factorial(-1)).toBe(undefined)
    })
    it('should return 120 when arg is five', () => {
        expect(factorial(5)).toBe(120)
    })
})