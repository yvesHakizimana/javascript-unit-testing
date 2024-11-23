// Lesson: Writing your first tests
export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAverage(numbers){
  if(numbers.length === 0) return NaN
  return numbers.reduce((acc, total) => acc + total, 0) / numbers.length;
}


export function factorial(number) {
  if(number < 0) return undefined;
  if(number === 1 || number === 0) return 1;
  return number * factorial(number - 1);
}