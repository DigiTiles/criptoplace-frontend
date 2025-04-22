import {Component, Input, OnInit} from "@angular/core";
import {YourTile} from "../../interface/your-tile";
import {InfoPageService} from "../../services/info-page.service";


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.sass']
})
export class CurrencySelectorComponent implements OnInit {
  @Input() tiles: YourTile[] = [];
  @Input() isImage: boolean = false;
  @Input() variable: YourTile = {
    id: 0,
    src: "",
    alt: "",
    xPosition: 0,
    yPosition: 0,
    name: "",
  };
  @Input() isRight: boolean = false;
  colorVariable: number = 0;
  contentDropdown: boolean = false;

  constructor(public pageService: InfoPageService) { }

  ngOnInit(): void {
  }


  dropdownOpen() {
    this.contentDropdown = !this.contentDropdown
  }

  changeVariable(variable: any) {
    this.variable = variable;
    this.colorVariable = variable.id;
    this.contentDropdown = false;
    if (variable.name !== "") {
      this.pageService.changePage(variable.name);
    }
  }
}
