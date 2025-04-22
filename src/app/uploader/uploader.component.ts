import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {PositionService} from "../../services/position.service";
import {Tile} from "../../interface/tile";
import {MetamaskService} from "../metamask/metamask.service";



@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent implements OnInit{
  xPosition!: number;
  yPosition!: number;
  isOpen: boolean = true;
  image!: string;
  file!: string;
  userAddress!: string;
  openTab: string = 'info';
  statusTile: string = 'UNKNOWN';
  infoTile: Tile = {
    owner: '',
    rentedBy: '',
    price: 0,
    rentPrice: 0,
    minRentPeriod: 0,
    maxRentPeriod: 0,
    rentedUntil: 0,
    availableForRent: false,
    availableForSale: false,
    image: '',
    lastAction: 'No',
    timeAction: 0
  };

  constructor(public positionService: PositionService,  public metamaskService: MetamaskService, public criptoService: ContractService) { }

  async ngOnInit() {
    this.positionService.position$.subscribe(async pos => {
      this.xPosition = pos.x;
      this.yPosition = pos.y;
      this.image = pos.image;
      this.isOpen = true;
      this.infoTile = await this.criptoService.getTileInfo(pos.x, pos.y);
      this.getStatus();
    });
    this.userAddress = await this.metamaskService.getAccount()
  }

  setOpenButton(typeMenu: string){
    this.openTab = typeMenu;
  }

  closeMenu() {
    this.isOpen = false;
  }

  getStatus() {
    if (this.userAddress.toLowerCase() == this.infoTile.owner.toLowerCase()){
      this.statusTile = 'YOUR TILE';
      return;
    }
    this.statusTile = 'FREE';
    return;
  }
}
