import { isValidDate, isValidRate, isValidMonthYear } from '../src/utils/utils';

test('valid date format', () => {
  expect(isValidDate('2022-05-01')).toBe(true);
  expect(isValidDate('2022-5-1')).toBe(false);
  expect(isValidDate('invalid-date')).toBe(false);
});

test('valid rate', () => {
  expect(isValidRate('0.2')).toBe(true);
  expect(isValidRate('1.5')).toBe(false);
  expect(isValidRate('invalid-rate')).toBe(false);
});

test('valid month and year', () => {
  expect(isValidMonthYear('5', '2022')).toBe(true);
  expect(isValidMonthYear('13', '2022')).toBe(false);
  expect(isValidMonthYear('5', 'invalid-year')).toBe(false);
});
