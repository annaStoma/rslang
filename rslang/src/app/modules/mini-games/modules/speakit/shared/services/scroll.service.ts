import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class ScrollService {

  constructor(private renderer: Renderer2) {}

  off(): void {
    this.renderer.addClass(document.body, 'body-overflow-hidden');
  }

  on(): void {
    this.renderer.removeClass(document.body, 'body-overflow-hidden');
  }
}
