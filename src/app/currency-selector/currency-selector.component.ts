import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.sass']
})
export class CurrencySelectorComponent implements OnInit {
  selectedCurrency : number | undefined;
  currencies = [
    {id: 1, name: 'Bitcoin'},
    {id: 2, name: 'Ethereum'},
    {id: 3, name: 'Tether'},
    {id: 4, name: 'Binance Smart Chain'},
    {id: 5, name: 'Solana'},
    {id: 6, name: 'Avalanche'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
