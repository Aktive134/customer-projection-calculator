import { CustomerGrowthCalc } from './calculator';
import {
  rl,
  askQuestion,
  isValidDate,
  isValidRate,
  isValidMonthYear
} from '../src/utils/utils';

const main = async () => {
  let initialCustomers: number;
  let startDate: string;
  let growthRate: number;

  while (true) {
    try {
      initialCustomers = parseFloat(await askQuestion('Initial Customers: '));
      if (isNaN(initialCustomers) || initialCustomers <= 0) {
        throw new Error("Invalid number for initial customers. Please enter a positive number.");
      }
      break;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  while (true) {
    try {
      startDate = await askQuestion('Start Date (YYYY-MM-DD): ');
      if (!isValidDate(startDate)) {
        throw new Error("Invalid date format. Please enter a valid date (YYYY-MM-DD).");
      }
      break;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  while (true) {
    try {
      growthRate = parseFloat(await askQuestion('Monthly Growth Rate (e.g., 0.05 for 5%): '));
      if (isNaN(growthRate) || growthRate < 0 || growthRate > 1) {
        throw new Error("Invalid growth rate. Please enter a number between 0 and 1 (e.g., 0.05 for 5%).");
      }
      break;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  let calculator = new CustomerGrowthCalc(initialCustomers, startDate, growthRate);

  const promptGrowthRates = async () => {
    while (true) {
      try {
        const input = await askQuestion(`Enter month, year, and growth rate (MM YYYY RATE) \n` +
          `or "all current year MM YYYY RATE" \n` +
          `or "all future years MM YYYY RATE" \n` +
          `or "done" to finish: `);

        if (input.toLowerCase() === 'done') break;

        const parts = input.split(' ');

        if (parts.length === 3) {
          const [month, year, rate] = parts;
          if (!isValidMonthYear(month, year)) {
            throw new Error("Invalid month or year. Please enter a valid month (1-12) and year.");
          }
          if (!isValidRate(rate)) {
            throw new Error("Invalid growth rate. Please enter a number between 0 and 1 (e.g., 0.05 for 5%).");
          }
          calculator.updateGrowthRate(parseInt(month), parseInt(year), parseFloat(rate));
          console.log(`Updated growth rate for ${month}/${year} to ${rate}`);
        } else if (parts.length === 6 && parts[0] === 'all' && parts[1] === 'current' && parts[2] === 'year') {
          const [month, year, rate] = parts.slice(3);
          if (!isValidMonthYear(month, year)) {
            throw new Error("Invalid month or year. Please enter a valid month (1-12) and year.");
          }
          if (!isValidRate(rate)) {
            throw new Error("Invalid growth rate. Please enter a number between 0 and 1 (e.g., 0.05 for 5%).");
          }
          calculator.updateGrowthRateForCurrentYear(parseInt(month), parseInt(year), parseFloat(rate));
          console.log(`Updated growth rate for all future months in ${year} starting from ${month} to ${rate}`);
        } else if (parts.length === 6 && parts[0] === 'all' && parts[1] === 'future' && parts[2] === 'years') {
          const [month, year, rate] = parts.slice(3);
          if (!isValidMonthYear(month, year)) {
            throw new Error("Invalid month or year. Please enter a valid month (1-12) and year.");
          }
          if (!isValidRate(rate)) {
            throw new Error("Invalid growth rate. Please enter a number between 0 and 1 (e.g., 0.05 for 5%).");
          }
          calculator.updateGrowthRateForNextFiveYears(parseInt(month), parseInt(year), parseFloat(rate));
          console.log(`Updated growth rate for all future months over the next 5 years starting from ${month}/${year} to ${rate}`);
        } else {
          throw new Error('Invalid input. Please follow the format.');
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  await promptGrowthRates();

  const results = calculator.calculateCustomers();
  console.log('Customer Projection for the next 5 years:');
  results.forEach((result) => {
    console.log(`${result.month} ${result.year}: ${result.customers} customers`);
  });

  rl.close();
};

main();
