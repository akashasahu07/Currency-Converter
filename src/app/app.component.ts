import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Currency-Converter';

  currencies: [string, string][] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  fromVal: number = 0;
  toVal: number = 0;

  isDarkMode: boolean = true;

  ngOnInit(): void {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.currencies = Object.entries(data);
        if (this.currencies.length > 0) {
          this.fromCurrency = this.currencies[0][0];
          this.toCurrency = this.currencies.length > 1 ? this.currencies[1][0] : this.currencies[0][0];
        }
      })
      .catch(error => {
        console.error('Failed to load currency list:', error);
      });
  }

  onFromCurrencyChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.fromCurrency = target.value;
  }

  onToCurrencyChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.toCurrency = target.value;
  }

  onFromValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fromVal = parseFloat(target.value) || 0;
  }

  Calculate(): void {
    if (!this.fromCurrency || !this.toCurrency || this.fromVal <= 0) {
      this.toVal = 0;
      return;
    }

    if (this.fromCurrency === this.toCurrency) {
      this.toVal = this.fromVal;
      return;
    }

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.fromCurrency}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const ratesForBaseCurrency = data[this.fromCurrency];
        if (ratesForBaseCurrency && ratesForBaseCurrency[this.toCurrency] !== undefined) {
          const rate = ratesForBaseCurrency[this.toCurrency];
          this.toVal = this.fromVal * rate;
        } else {
          console.error(`Rate not found for ${this.fromCurrency} to ${this.toCurrency}`);
          this.toVal = 0;
        }
      })
      .catch(error => {
        console.error('Failed to fetch exchange rate:', error);
        this.toVal = 0;
      });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}