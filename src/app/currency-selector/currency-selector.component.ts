import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.sass']
})
export class CurrencySelectorComponent implements OnInit {
  // selectedCurrency : number | undefined;
  // currencies = [
  //   {id: 1, name: 'Bitcoin'},
  //   {id: 2, name: 'Ethereum'},
  //   {id: 3, name: 'Tether'},
  //   {id: 4, name: 'Binance Smart Chain'},
  //   {id: 5, name: 'Solana'},
  //   {id: 6, name: 'Avalanche'},
  // ]
  constructor() { }

  ngOnInit(): void {
  }

  array: any = [
    {
      id: 0,
      src: "../../assets/bitcoinLogo.svg",
      alt: "bitcoin logo",
      name: "Bitcoin",
    },
    {
      id: 1,
      src: "../../assets/ethereumLogo.svg",
      alt: "Ethereum logo",
      name: " Ethereum",
    },
    {
      id: 2,
      src: "../../assets/tetherLogo.svg",
      alt: "Tether logo",
      name: "Tether",
    },
    {
      id: 3,
      src: "../../assets/binanceLogo.svg",
      alt: "Binance Smart Chain logo",
      name: "Binance Smart Chain",
    },
    {
      id: 4,
      src: "../../assets/solanaLogo.svg",
      alt: "Solana logo",
      name: "Solana",
    },
    {
      id: 5,
      src: "../../assets/avalancheLogo.svg",
      alt: "Avalanche logo",
      name: "Avalanche",
    },
  ]


  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown
  }
  srcvariable: string = '../../assets/bitcoinLogo.svg'
  altvariable: string = 'bitcoin logo'
  namevariable: string = 'Bitcoin'
  colorvariable: number = 0;


  changecode(arr: any) {
    this.srcvariable = arr.src;
    this.altvariable = arr.alt;
    this.namevariable = arr.name;
    this.srcvariable = arr.src;
    this.colorvariable = arr.id;
    this.contentdropdown = false
  }
}
