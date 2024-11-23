import {describe, expect, it, vi} from "vitest";

import {
    getDiscount,
    getPriceInCurrency,
    getShippingInfo,
    isOnline,
    login,
    renderPage,
    signUp,
    submitOrder
} from "../src/mocking.js";
import {getExchangeRate} from "../src/libs/currency.js";
import {getShippingQuote} from "../src/libs/shipping.js";
import {trackPageView} from "../src/libs/analytics.js";
import {charge} from "../src/libs/payment.js";
import {sendEmail} from "../src/libs/email.js";
import {send} from "vite";
import security from "../src/libs/security.js";

vi.mock('../src/libs/currency.js');
vi.mock('../src/libs/shipping.js');
vi.mock('../src/libs/analytics.js');
vi.mock('../src/libs/payment.js');

// Partial Mocking
// in the email js we have two functions one is validateEmail, which will be kept the same and change the implementation of sendEmail , to mean I didn't have to mock every function in the file.
vi.mock('../src/libs/email.js', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        sendEmail: vi.fn()
    }
});

describe("test suite", () => {
    it('test case with mocking', () => {
        // create a mock function from vitest using vi.fn to create sendText
        const sendText = vi.fn()
        sendText.mockReturnValue("ok")

        // Call the mock function
        const result = sendText('message')

        // Assert the mock function has been called
        expect(sendText).toHaveBeenCalled();
        // Assert the response of the mock function.
        expect(result).toBe("ok")
    })
})

describe("getPriceCurrency", () => {
    it('should return shipping unavailable if quote cannot be fetched', () => {
        // Mocked the return Value of function get Exchange rate being used in getPriceCurrency.
        vi.mocked(getExchangeRate).mockReturnValue(1.5)

        const price = getPriceInCurrency(10, 'USD')

        expect(price).toBe(15)
    })

})

describe('getShippingInfo', () => {

    it('should return shipping unavailable if quote cannot be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null )

        const result = getShippingInfo('london')

        expect(result).toMatch(/unavailable/i)
    })

    it('should return details of shipping when details are available', () => {
        vi.mocked(getShippingQuote).mockReturnValue({cost: 10, estimatedDays: 2})

        const result = getShippingInfo('london')

        expect(result).toMatch('$10')
        expect(result).toMatch(/2 days/i)
        expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i)
    })
 })

describe('renderPage', () => {
    it('should return the correct content', async () => {
        const result = await renderPage()

        expect(result).toMatch(/content/i)
    });

    it('should call analytics lib', async () => {
        await renderPage()

        expect(trackPageView).toHaveBeenCalledWith('/home')

    })
})

describe('Submit Order', () => {
    const order = {totalAmount: 10}
    const creditCard = { creditCardNumber: '1234' }

    it('should charge a customer ', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'success'})

        await submitOrder(order, creditCard)

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount)
    })

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'success'})

        const result =  await submitOrder(order, creditCard)

        expect(result).toEqual({ success : true })


    })

    it('should return payment error when payment fails', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'failed'})

        const result =  await submitOrder(order, creditCard)

        expect(result).toEqual({success : false , error: 'payment_error'})
    })
})

describe('Signup', () => {
    const email = 'name@domain.com'
    it('should return false for an invalid email', async () => {
        const result = await signUp('a')

        expect(result).toBe(false)
    })

    it('should return true it is valid email', async () => {
        const result = await signUp(email)
        expect(result).toBe(true)
    })

    it('should send welcome email if the email is valid', async () => {
        await signUp(email)

        expect(sendEmail).toHaveBeenCalledTimes(2)
        const args = vi.mocked(sendEmail).mock.calls[0]
        expect(args[0]).toEqual(email)
        expect(args[1]).toMatch(/welcome/i)



    })

})

// Using spy functions to watch and capture method outputs.
describe('Login', () => {
    it('Should generate one time login code', async () => {
        const email = 'email@domain.com'
        // This is for watching the output/ or how the method runs. of the generateCode method of security class
        const spy = vi.spyOn(security, 'generateCode')

        await login(email)

        // Having the output from the method security generate code.
        const securityCode = spy.mock.results[0].value.toString()
        expect(sendEmail).toHaveBeenCalledWith(email, securityCode)
    })


})

// Mocking system dates and hours.// using vi.setSystemTime(time)
describe('isOnline', () => {
    it('should return false if the current hour is outside opening hours', () => {
        vi.setSystemTime('2024-01-01 07:59');
        expect(isOnline()).toBe(false);

        vi.setSystemTime('2024-01-01 20:01');
        expect(isOnline()).toBe(false);
    });

    it('should return true if the current hour is within opening hours', () => {
        vi.setSystemTime('2024-01-01 09:00')
        expect(isOnline()).toBe(true);

        vi.setSystemTime('2024-01-01 08:00')
        expect(isOnline()).toBe(true);

        vi.setSystemTime('2024-01-01 19:59')
        expect(isOnline()).toBe(true);
    })
})

describe('getDiscount', () => {
    it('should give discount of 0.2 on christmas day', () => {
        vi.setSystemTime("2024-12-25 00:01")
        expect(getDiscount()).toBe(0.2)

        vi.setSystemTime("2024-12-25 23:59")
        expect(getDiscount()).toBe(0.2)
    })
    it('should give a discount of 0 having christmas day ended', () => {
        vi.setSystemTime("2024-12-26 00:01")
        expect(getDiscount()).toBe(0)
        vi.setSystemTime("2024-12-24 23:59")
        expect(getDiscount()).toBe(0)
    })
})