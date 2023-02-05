import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  currentAccount = null;
  constructor() {
    // setInterval(this.getAccount, 3000);
  }

  public async checkExtension() {
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      try {
        //@ts-ignore
        await ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.log(error);
        alert('user rejected login');
      }
    } else {
      alert(
        'This Web3 application \r\nUse MetaMask extension to use the application features'
      );
    }
  }

  // public async getAccount() {
  //   //@ts-ignore
  //   const accounts = await ethereum.request({ method: 'eth_accounts' });
  //   const indicator = document.querySelector('.metaLogo');
  //   const account = accounts[0];
  //   if (account !== undefined || 0) {
  //     try {
  //       indicator?.classList.add('metaLogo_active');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     indicator?.classList.remove('metaLogo_active');
  //   }
  // }
}
