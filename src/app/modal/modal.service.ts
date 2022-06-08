import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isShown$ = new BehaviorSubject(false)

  openModal() {
    this.isShown$.next(true)
  }

  closeModal() {
    this.isShown$.next(false)
  }

}
