import { CustomerGrowthCalc } from '../src/calculator';

describe('CustomerGrowthCalc', () => {
  test('should initialize correctly with valid inputs', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    expect(calculator).toBeTruthy();
  });

  test('should calculate customers correctly for the default growth rate', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    const results = calculator.calculateCustomers();
    expect(results[0].customers).toBe(200);
    expect(results[1].customers).toBeCloseTo(208);
    expect(results[2].customers).toBeCloseTo(216);
  });

  test('should update growth rate for a specific month', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    calculator.updateGrowthRate(6, 2022, 0.1); // June 2022
    const results = calculator.calculateCustomers();
    console.log('Results for specific month growth rate update:', results);
    expect(results[0].customers).toBe(200);
    expect(results[1].customers).toBeCloseTo(220);
    expect(results[2].customers).toBeCloseTo(229);
  });

  test('should update growth rate for all future months in the current year', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    calculator.updateGrowthRateForCurrentYear(6, 2022, 0.1); // From June 2022
    const results = calculator.calculateCustomers();
    expect(results[0].customers).toBe(200);
    expect(results[1].customers).toBeCloseTo(220);
    expect(results[2].customers).toBeCloseTo(242);
    expect(results[3].customers).toBeCloseTo(266);
  });

  test('should update growth rate for all future months over the next 5 years', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    calculator.updateGrowthRateForNextFiveYears(6, 2022, 0.1); // From June 2022
    const results = calculator.calculateCustomers();
    expect(results[0].customers).toBe(200);
    expect(results[1].customers).toBeCloseTo(220);
    expect(results[2].customers).toBeCloseTo(242);
    expect(results[3].customers).toBeCloseTo(266);
    expect(results[11].customers).toBeCloseTo(571);
  });

  test('should not allow updating growth rate for dates before the initial start date', () => {
    const calculator = new CustomerGrowthCalc(200, '2022-05-01', 0.04);
    expect(() => {
      calculator.updateGrowthRate(4, 2022, 0.1); // April 2022
    }).toThrow("The date for the update must be after the initial start date.");
  });
});
