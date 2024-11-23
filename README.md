# Unit Testing with Vitest

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Core Concepts](#core-concepts)
- [Exercises](#exercises)
- [Code Coverage](#code-coverage)
- [Mocking Dependencies](#mocking-dependencies)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

This repository serves as a comprehensive introduction to **unit testing** using **Vitest**, a blazing-fast JavaScript testing framework. You'll learn fundamental testing principles, advanced techniques, and how to leverage Vitest for building reliable, maintainable applications.

This project covers:
- Writing and running unit tests.
- Test-driven development (TDD).
- Mocking dependencies.
- Testing asynchronous code.
- Ensuring code quality with coverage tools.

Whether you're a beginner or looking to sharpen your skills, this repo has something for you.

---

## Features

- **Unit Testing Basics**: Understand the purpose and importance of unit tests.
- **Core Techniques**: Write tests for various scenarios, including boundary cases and edge cases.
- **TDD Workflow**: Learn to design functions using test-driven development principles.
- **Mocking**: Create mock functions and modules to isolate tests and simulate external dependencies.
- **Asynchronous Testing**: Handle promises, callbacks, and async/await in tests.
- **Code Coverage**: Measure and improve test coverage to ensure thorough testing.

---

## Setup

### Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/).
- **Package Manager**: Use `npm`, `yarn`, or `pnpm`.

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

---

## Usage

### Running Tests
Execute all tests:
```bash
npm test
```

Watch for changes:
```bash
npm test -- --watch
```

Run tests with code coverage:
```bash
npm test -- --coverage
```

---

## Core Concepts

### Writing Tests
Start with simple tests for pure functions:
```javascript
import { describe, it, expect } from 'vitest';

describe('fizzBuzz', () => {
  it('returns "Fizz" for multiples of 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('returns "Buzz" for multiples of 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('returns "FizzBuzz" for multiples of 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
});
```

### Using Matchers
Vitest provides powerful matchers for various scenarios:
```javascript
expect(value).toBeTruthy();
expect(array).toContain(item);
expect(() => fn()).toThrow();
```

### Asynchronous Tests
Use async/await or `done` for asynchronous code:
```javascript
it('resolves with data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ id: 1, name: 'Test' });
});
```

---

## Exercises

### Examples Covered:
1. **FizzBuzz**: Basic test cases for a common coding problem.
2. **Factorial Function**: TDD workflow.
3. **getCoupons**: Writing robust assertions.
4. **validateUserInput**: Positive and negative tests.
5. **isValidUsername**: Boundary tests.
6. **canDrive**: Parameterized testing for multiple inputs.
7. **Async Stack Operations**: Testing asynchronous methods.

---

## Code Coverage

Generate detailed test coverage reports:
```bash
npm test -- --coverage
```

View the report in your terminal or browser for insights into untested code.

---

## Mocking Dependencies

### Mock Functions
Replace real implementations with mock behavior:
```javascript
const mockFn = vi.fn();
mockFn.mockReturnValue('mocked value');
```

### Mocking Modules
Stub modules to test code in isolation:
```javascript
vi.mock('./module', () => ({
  getData: vi.fn().mockResolvedValue({ key: 'value' }),
}));
```

---

## Best Practices

1. **Write Small, Focused Tests**: Each test should validate a single behavior.
2. **Test Edge Cases**: Include positive, negative, and boundary tests.
3. **Use Mocks Sparingly**: Mock only external dependencies or side effects.
4. **Maintain Test Coverage**: Aim for at least 80% coverage while focusing on critical paths.
5. **Run Tests Frequently**: Use `--watch` mode during development.

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

Feel free to explore the repository and practice exercises to become proficient in unit testing with Vitest!