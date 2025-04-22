import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  private pageSource = new BehaviorSubject<string>('');
  page$ = this.pageSource.asObservable();

  changePage(newPage: string) {
    this.pageSource.next(newPage);
  }
}
