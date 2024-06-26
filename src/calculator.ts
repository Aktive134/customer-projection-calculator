export interface CustomerGrowth {
    month: string;
    year: number;
    customers: number;
  }
  
  export class CustomerGrowthCalc {
    private initialCustomers: number;
    private startDate: Date;
    private growthRate: number;
    private customGrowthRates: Record<number, Record<number, number>>;
  
    constructor(initialCustomers: number, startDate: string, growthRate: number) {
      this.initialCustomers = initialCustomers;
      this.startDate = new Date(startDate);
      this.growthRate = growthRate;
      this.customGrowthRates = {};
    }
  
    private isDateValid(month: number, year: number): boolean {
      const updateDate = new Date(year, month - 1);
      return updateDate >= this.startDate;
    }
  
    // Method to update growth rate for a specific month
    updateGrowthRate(month: number, year: number, rate: number): void {
      if (!this.isDateValid(month, year)) {
        throw new Error("The date for the update must be after the initial start date.");
      }
      if (!this.customGrowthRates[year]) {
        this.customGrowthRates[year] = {};
      }
      this.customGrowthRates[year][month] = rate;
    }
  
    // Method to update growth rate for all future months in the current year
    updateGrowthRateForCurrentYear(month: number, year: number, rate: number): void {
      if (!this.isDateValid(month, year)) {
        throw new Error("The date for the update must be after the initial start date.");
      }
      for (let m = month; m <= 12; m++) {
        this.updateGrowthRate(m, year, rate);
      }
    }
  
    // Method to update growth rate for all future months over the next 5 years
    updateGrowthRateForNextFiveYears(month: number, year: number, rate: number): void {
      if (!this.isDateValid(month, year)) {
        throw new Error("The date for the update must be after the initial start date.");
      }
      for (let y = year; y < year + 5; y++) {
        for (let m = (y === year ? month : 1); m <= 12; m++) {
          this.updateGrowthRate(m, y, rate);
        }
      }
    }
  
    // Method to calculate customers for each month over 5 years
    calculateCustomers(): CustomerGrowth[] {
      let currentCustomers = this.initialCustomers;
      let results: CustomerGrowth[] = [];
      let currentDate = new Date(this.startDate);
  
      for (let i = 0; i < 60; i++) {
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
  
        // Record initial customers without applying growth rate
        if (i > 0) {
          let growthRate = this.customGrowthRates[year]?.[month] ?? this.growthRate;
          currentCustomers *= (1 + growthRate);
        }
  
        results.push({
          month: currentDate.toLocaleString('default', { month: 'long' }),
          year: year,
          customers: Math.round(currentCustomers),
        });
  
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
  
      return results;
    }
  }
  