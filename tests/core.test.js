import {describe, it, expect, beforeEach} from "vitest";
import {
    calculateDiscount,
    canDrive, fetchData,
    getCoupons,
    isPriceInRange,
    isValidUsername, Stack,
    validateUserInput
} from "../src/core.js";

describe("Get Coupon code", () => {
    it('should return an array of coupon codes when called', () => {
        const coupons = getCoupons()
        expect(Array.isArray(coupons)).toBe(true);
        expect(coupons.length).toBeGreaterThan(0);
    })

    it('should return valid coupon codes ', () => {
        const coupons = getCoupons()
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect( typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy()
        })
    })

    it('should return valid coupon discount', () => {
        const coupons = getCoupons()
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect( typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeLessThan(1)
            expect(coupon.discount).toBeGreaterThan(0);
        })
    })
})

describe('Calculate Discount', () => {
    it('should return discounted price given a valid discount code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9)
        expect(calculateDiscount(10, 'SAVE20')).toBe(8)
    })

    it('should handle negative prices', () => {
        expect(calculateDiscount(-4, 'SAVE10')).toMatch(/invalid/i)
    })

    it('should handle non-numeric prices', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
    })

    it('should handle non-string discount code', () => {
        expect(calculateDiscount(10, 90)).toMatch(/invalid/i)
    })

    it('should handle invalid discount codes', () => {
        expect(calculateDiscount(10, 'Invalid')).toBe(10)
    })
})

describe('ValidateUserInput', () => {
    //Handling non-string usernames
    it('should handle non-string usernames', () => {
        expect(validateUserInput(true,  19)).toMatch(/invalid username/i)
    })

    //Validate that the username length will be above three.
    it('should ensure that the length of the a string username is above 3', () => {
        expect(validateUserInput('us', 19)).toMatch(/invalid username/i)
    })

    //Handle non-numeric ages
    it('should handle non-numeric ages', () => {
        expect(validateUserInput('username', '19')).toMatch(/invalid age/i)
    })

    //Handle age less than 18
    it('should ensure that the age is above 18', () => {
        expect(validateUserInput('username', 17)).toMatch(/Invalid age/i)
    })

    it('should return success when both username and age is valid', () => {
        expect(validateUserInput('username', 19)).toMatch(/success/i)
    })

})

describe('Test price in range', () => {
    it.each([
        {scenario: 'price < min', price: -10, result: false},
        {scenario: 'price > max', price: 200, result: false},
        {scenario: 'price = min', price: 0, result: true},
        {scenario: 'price = max', price: 100, result: true},
        {scenario: 'price between min and max', price: 50, result: true},
    ])('should return $result when $scenario', ({price, result}) => {
        expect(isPriceInRange(price, 0, 100)).toBe(result)
    } )
})

describe('Username length in range', () => {
    it.each([
        {scenario: 'username is too short', username: 'user', result: false},
        {scenario: 'username.length is too long', username: 'a'.repeat(16), result: false},
        {scenario: 'username.length = 5', username: 'husky', result: true},
        {scenario: 'username.length between minLength and maxLength', username: 'username', result: true},
        {scenario: 'username.length = 15', username: 'a'.repeat(15), result: true},
    ])("should return $result when $scenario", ({username, result}) => {
        expect(isValidUsername(username)).toBe(result)
    })
    it('should return false for invalid input types', () => {
        expect(isValidUsername(null)).toBe(false)
        expect(isValidUsername(undefined)).toBe(false)
        expect(isValidUsername(1)).toBe(false)

    })
})

describe('canDrive', () => {
    it('should return error for invalid country code', () => {
        expect(canDrive(10, 'FR')).toMatch(/invalid/i)
    })
    it.each([
        {age: 16, countryCode: 'US', result: true},
        {age: 15, countryCode: 'US', result: false},
        {age: 16, countryCode: 'UK', result: false},
        {age: 17, countryCode: 'US', result: true},
        {age: 18, countryCode: 'US', result: true},
        {age: 17, countryCode: 'UK', result: true},
        {age: 18, countryCode: 'UK', result: true},
    ])('should return $result when age is $age and country-code is $countryCode', ({age, countryCode, result}) => {
        expect(canDrive(age, countryCode)).toBe(result)
    })
})

describe('Fetch Data', () => {
    it('Should return a promise that will resolve an array of numbers', async() => {
        try {
            const data = await fetchData()
            expect(data.length).toBe(3)
        }
        catch (error) {
            expect(error).toHaveProperty('reason')
            expect(error.reason).toMatch(/fail/i)
        }
    })
})

describe('Stack Test', () => {
    let stack;
    beforeEach(() => {
        stack = new Stack()
    })

    it('push should add an item into the stack', () => {
        stack.push(1)
        expect(stack.size()).toBe(1)
    })
    it('pop should remove an item from the stack and return it', () => {
        stack.push(1)
        stack.push(2)

        const poppedItem = stack.pop()
        expect(poppedItem).toBe(2)
        expect(stack.size()).toBe(1)
    })
    it('peek should return the top most item in the stack', () => {
        stack.push(1)
        stack.push(2)

        const peekItem = stack.peek()

        expect(peekItem).toBe(2)
        expect(stack.size()).toBe(2)
    })
    it('should throw an error when stack is empty when peeking', () => {
        expect(() => stack.peek()).toThrow(/empty/i)
    })
    it('Should throw an error when stack is empty when popping', () => {
        expect(() => stack.peek()).toThrow(/empty/i)
    } )
    it('Should return true when stack is empty', () => {
        expect(stack.isEmpty()).toBe(true)
    })
    it('Should return total items in the stack', () => {
        stack.push(1)
        stack.push(2)
        stack.push(3)

        expect(stack.size()).toBe(3)
    })
    it('clear should remove all elements from the stack', () => {
        stack.push(1)
        stack.push(2)

        stack.clear()

        expect(stack.size()).toBe(0)
    })
})

