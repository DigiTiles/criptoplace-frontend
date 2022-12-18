import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MetamaskService } from './metamask/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  hash = '';
  isShown$ = this.modalService.isShown$;

  constructor(
    private route: ActivatedRoute,
    private readonly modalService: ModalService,
    private readonly extensionService: MetamaskService
  ) {}

  title = 'DigiTiles';

  ngOnInit(): void {
    this.route.fragment.pipe(tap(console.log)).subscribe(
      (hash) => (this.hash = hash || ''),
      (error) => console.error(error),
      () => console.log('complite!')
    );
  }

// getAccount() {
//   this.extensionService.getAccount();
// }

  metaCheck() {
   this.extensionService.checkExtension();
  }
  get getEth(){

    //@ts-ignore
    return window.ethereum;
  }
}
