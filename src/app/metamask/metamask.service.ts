import { Injectable } from '@angular/core';
import {getAddress} from "ethers/lib/utils";

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
        this.currentAccount = await ethereum.request({ method: 'eth_requestAccounts' });
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

  public async getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      return getAddress(accounts[0]);
    } else  {
      return 'none';
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
