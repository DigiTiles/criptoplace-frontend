import {Component, Input, OnInit} from '@angular/core';
import {Tile} from "../../../interface/tile";
import {ContractService} from "../../../services/contract.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass', './../image/image.component.sass'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('200ms ease', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class InformationComponent implements OnInit {
  @Input() xPosition!: number;
  @Input() yPosition!: number;
  @Input() infoTile!: Tile;
  @Input() statusTile!: string;
  ownerLink: string = '#';
  image: string = '';
  isOpenSale: boolean = false;
  isOpenRent: boolean = false;
  inputOptions: any = {
    costSale: '',
    costRent: '',
    minPeriod: '',
    maxPeriod: '',
    selectPeriod: ''
  }

  constructor(public criptoService: ContractService) {}

  ngOnInit() {
  }

  getOwner(owner: string) {
    if (owner && owner != '0x0000000000000000000000000000000000000000') {
      this.ownerLink = 'https://testnet.bscscan.com/address/' + owner;
      return owner.substring(0, 5) + '....' + owner.substring(owner.length - 4);
    } else {
      this.ownerLink = '#';
      return 'None';
    }
  }

  getStatus(availableForSale: boolean, availableForRent: boolean) {
    if (availableForSale && availableForRent) {
      return 'For sale and for rent';
    } else if (availableForSale) {
      return 'For sale';
    } else if (availableForRent) {
      return 'For rent';
    } else {
      return 'Not for sale or rent';
    }
  }

  async buyTile() {
    await this.criptoService.buy(this.xPosition, this.yPosition);
  }

  async setTileSale() {
    await this.criptoService.setSaleStatus(this.xPosition, this.yPosition, true, this.inputOptions.costSale);
  }

  async setTileRent() {
    await this.criptoService.setRentStatus(this.xPosition, this.yPosition, true, this.inputOptions.costRent, this.inputOptions.minPeriod, this.inputOptions.maxPeriod);
  }

  getAvailableForSale() {
    if (this.infoTile.availableForSale){
      return this.infoTile.price + ' ETH'
    }
    return 'No'
  }

  getAvailableForRent() {
    if (this.infoTile.availableForRent){
      return this.infoTile.rentPrice + ' ETH/per day'
    }
    return 'No'
  }

  changeOpenSettings(type: string) {
    if (type == 'sale') {
      this.isOpenSale = !this.isOpenSale;
      this.inputOptions.costSale = this.infoTile.price;
      this.isOpenRent = false;
    } else if (type == 'rent') {
      this.isOpenRent = !this.isOpenRent;
      this.inputOptions.costRent = this.infoTile.rentPrice;
      this.inputOptions.minPeriod = this.infoTile.minRentPeriod;
      this.inputOptions.maxPeriod = this.infoTile.maxRentPeriod;
      this.isOpenSale = false;
    }
  }

  onNumericInputChange(value: string, field: keyof typeof this.inputOptions) {
    const filtered = value
      .replace(/[^0-9.]/g, '')
      .replace(/^([^.]*\.)|\./g, '$1');

    this.inputOptions[field] = filtered;
  }

  rentTile() {
    this.criptoService.rent(this.xPosition, this.yPosition, this.inputOptions.selectPeriod, this.infoTile.rentPrice);
  }

  getSumRent() {
    if (this.inputOptions.selectPeriod) {
      return this.inputOptions.selectPeriod * this.infoTile.rentPrice;
    } else {
      return '0';
    }
  }
}
