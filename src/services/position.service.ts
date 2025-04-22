import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Position {
  x: number;
  y: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private positionSource = new BehaviorSubject<Position>({x: 0, y: 0, image: ''});
  position$ = this.positionSource.asObservable();

  updatePosition(newXValue: number, newYValue: number, newImageValue: string) {
    this.positionSource.next({x: newXValue, y: newYValue, image: newImageValue});
  }
}
