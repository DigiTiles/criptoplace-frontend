import {Component, OnInit} from '@angular/core';
import {InfoPageService} from "../../services/info-page.service";

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.sass']
})
export class InfoPageComponent implements OnInit {
  pageTitle: string = '';

  constructor(public pageService: InfoPageService) { }

  ngOnInit(): void {
    this.pageService.page$.subscribe((page) => {
      this.pageTitle = page;
      console.log(this.pageTitle )
    });

  };

  closeMenu(){
    this.pageService.changePage('');
  }
}
