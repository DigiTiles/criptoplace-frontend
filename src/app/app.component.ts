import {Component, OnInit} from '@angular/core';
import {ModalService} from "./modal/modal.service";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  hash = '';
  isShown$ = this.modalService.isShown$

  constructor(private route: ActivatedRoute,
    private readonly modalService: ModalService) {
  }

  title = 'criptoplace-frontend';

  ngOnInit(): void {
    this.route.fragment.pipe(
      tap(console.log)
    ).subscribe(
      hash => this.hash = hash || '',
      error => console.error(error),
      () => console.log('complite!')
    )
  }

}
