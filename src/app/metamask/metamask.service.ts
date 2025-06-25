import { Injectable } from '@angular/core';
import {getAddress} from "ethers/lib/utils";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {

  private currentAccount:string = '';
  private extensionStatusSubject = new BehaviorSubject<boolean>(false); // Начальное значение false
  public extensionStatus$ = this.extensionStatusSubject.asObservable();

  constructor() {}

  public get CurrentAccount(): string {
    return this.currentAccount;
  }

  public async checkExtension(): Promise<void> {
      try {
        await this.getAccount();
        this.extensionStatusSubject.next(true);
      } catch (error) {
        console.error(error);
        this.extensionStatusSubject.next(false);
      }
  }

  private async getAccount(): Promise<string> {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      return getAddress(accounts[0]);
    } else  {
      throw new Error('No accounts found');
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
