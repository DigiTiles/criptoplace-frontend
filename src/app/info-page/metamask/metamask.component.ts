import {Component, OnInit} from '@angular/core';
import {MetamaskService} from "../../metamask/metamask.service";

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.sass', '../info-page.component.sass']
})
export class MetamaskComponent implements OnInit{

  protected connectionResult: boolean = false;

  constructor(protected readonly extensionService: MetamaskService) {
  }

  async ngOnInit(): Promise<void> {
    this.extensionService.extensionStatus$.subscribe(status => {
      this.connectionResult = status;
    });
  }

  protected installMetaMask(): void {
   window.open('https://metamask.io/download', '_blank');
  }

  protected connectedMetaMask(): void {
    if (typeof window.ethereum !== 'undefined') {
      this.requestAccountConnection().then(() => {});
    } else {
      this.installMetaMask()
    }
  }

  private async requestAccountConnection(): Promise<void> {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await this.extensionService.checkExtension();
    } catch (error) {
      console.log('User rejected connection', error);
      alert('You rejected the connection request.');
    }
  }

}
