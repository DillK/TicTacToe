import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesMediatorService {
  isAnimationEnabled: boolean = true;
  useSmoothAnimation: boolean = true;

  get targetFps(): 60 | 30 {
    return this.useSmoothAnimation ? 60 : 30;
  }

  get frequency(): number {
    return 1000 / this.targetFps;
  }

  constructor() { }
}