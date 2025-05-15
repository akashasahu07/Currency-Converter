import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Currency-Converter';

  currencies:any = [];
  fromCurrency: any;
  toCurrency: any;
  fromVal: number = 0;
  toVal: number = 0;

  constructor() {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        this.currencies = Object.values(data);
        // console.log(this.currencies)
      })
  }

  onFromCurrency(event: any) {
    this.fromCurrency=event.target.value
    console.log(event.target.value)
  }

  onToCurrency(event: any) {
    console.log(event.target.value)
  }

  fromValue(event: any) {
    this.fromVal = event.target.value
    console.log(this.fromVal)
  }

  Calculate() {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.fromCurrency}.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }
}
