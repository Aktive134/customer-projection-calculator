import * as readline from 'readline';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

export const isValidDate = (date: string) => {
  // Check if the date matches the YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    return false;
  }
  // Check if the date is valid
  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
};

export const isValidRate = (rate: string) => {
  const num = parseFloat(rate);
  return !isNaN(num) && num >= 0 && num <= 1;
};

export const isValidMonthYear = (month: string, year: string) => {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  return !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 && !isNaN(yearNum);
};
