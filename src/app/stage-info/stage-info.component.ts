import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stage-info',
  templateUrl: './stage-info.component.html',
  styleUrls: ['./stage-info.component.sass']
})
export class StageInfoComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {}

  array: any = [
    {
      id: 0,
      src: "../../assets/bitcoinLogo.svg",
      alt: "bitcoin logo",
      name: "Bitcoin (BTC)",
    },
    {
      id: 1,
      src: "../../assets/ethereumLogo.svg",
      alt: "Ethereum logo",
      name: " Ethereum (ETH)",
    },
    {
      id: 2,
      src: "../../assets/tetherLogo.svg",
      alt: "Tether logo",
      name: "Tether (USDT)",
    },
    {
      id: 3,
      src: "../../assets/binanceLogo.svg",
      alt: "Binance Smart Chain logo",
      name: "Binance Smart Chain (BNB)",
    },
    {
      id: 4,
      src: "../../assets/solanaLogo.svg",
      alt: "Solana logo",
      name: "Solana (SOL)"
    },
    {
      id: 5,
      src: "../../assets/avalancheLogo.svg",
      alt: "Avalanche logo",
      name: "Avalanche (AVAX)",
    },
  ]


  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown
  }
  srcvariable: string = '../../assets/bitcoinLogo.svg'
  altvariable: string = 'bitcoin logo'
  namevariable: string = 'Bitcoin (BTC)'
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
