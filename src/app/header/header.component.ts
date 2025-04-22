import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MetamaskService} from "../metamask/metamask.service";
import {tap} from "rxjs/operators";
import {YourTile} from "../../interface/your-tile";
import {InfoPageService} from "../../services/info-page.service";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = '';
  hash = '';
  myTiles: YourTile[] = [];

  variableTile: YourTile = {
    id: 100000,
    src: "../../assets/plugMyTile.svg",
    alt: "plug my tile",
    xPosition: 0,
    yPosition: 0,
    name: "My Tiles",
  }

  about: YourTile[] = [{
    id: 0,
    src: "",
    alt: "",
    xPosition: 0,
    yPosition: 0,
    name: "About digitiles",
  },
  {
    id: 1,
    src: "",
    alt: "",
    xPosition: 0,
    yPosition: 0,
    name: "Project Features",
  },
  {
    id: 2,
    src: "",
    alt: "",
    xPosition: 0,
    yPosition: 0,
    name: "Roadmap",
  }
  ]

  constructor(
    private route: ActivatedRoute,
    private readonly extensionService: MetamaskService,
    public pageService: InfoPageService,
    public contractService: ContractService,
  ) {}

  title = 'DigiTiles';

  async ngOnInit(): Promise<void> {
    this.route.fragment.pipe(tap(console.log)).subscribe(
      (hash) => (this.hash = hash || ''),
      (error) => console.error(error),
      () => console.log('complite!')
    );
    const address = await this.extensionService.getAccount();
    const tiles = await this.contractService.getTilesByOwner(address);
    for (let i = 0; i < tiles.length; i++) {
      const x =  33554432 + Number(tiles[i].x);
      const y = 33554432 + Number(tiles[i].y);
      this.myTiles.push({
        id: i,
        src: `http://digitiles.itwis-demos.com/tiles/26x${x}x${y}.png?`,
        alt: `plug my tile ${i}`,
        xPosition: tiles[i].x,
        yPosition: tiles[i].y,
        name: "",
      });
    }

    this.pageService.page$.subscribe((page) => {
      this.pageTitle = page;
    });
  }

  metaCheck() {
    this.extensionService.checkExtension();
  }

  changePage(page: string) {
    this.pageService.changePage(page);
  }
}
